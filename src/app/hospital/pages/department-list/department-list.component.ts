import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DepartmentService} from '@hdm-hospital/services/department/department.service';
import {BehaviorSubject, combineLatest, Observable, of, throwError, iif} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, mergeMap, tap} from 'rxjs/operators';
import {Department} from '@hdm-hospital/models/department';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'hdm-department-list',
    templateUrl: './department-list.component.html',
    styleUrls: ['./department-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentListComponent implements OnInit {

    private searchSubject = new BehaviorSubject<string>('');
    public search$ = this.searchSubject.pipe(
        debounceTime(400),
        distinctUntilChanged(),
    );
    public departments$: Observable<Department[]>;
    public filterValue: string;

    constructor(private departmentService: DepartmentService, private snackBar: MatSnackBar) {
    }

    public ngOnInit(): void {
        this.departments$ = combineLatest([this.departmentService.getDepartments(), this.search$]).pipe(
            mergeMap(([result, filter]) => !result.isOk ? throwError(result.errorMessage) : of([result.value, filter])),
            map(([items, filter]: [Department[], string]) => this.filterDepartments(items, filter)),
            catchError(err => {
                this.snackBar.open(err, '', {
                    duration: 4000,
                });

                return of([]);
            }),
        );
    }

    public changeFilterValue(searchValue: string): void {
        this.searchSubject.next(searchValue);
    }

    public trackById(index: number, item: Department): string {
        return item ? item.id : index.toString();
    }

    private filterDepartments(items: Department[], searchValue: string): Department[] {
        if (!items || !items.length) { return []; }
        if (!searchValue) { return items; }

        return items.filter(d => d.info.name.toUpperCase().indexOf(searchValue.toUpperCase()) > -1
            || d.info.apiKey.toUpperCase().indexOf(searchValue.toUpperCase()) > -1
            || d.contactPerson.name.toUpperCase().indexOf(searchValue.toUpperCase()) > -1
        );
    }

}
