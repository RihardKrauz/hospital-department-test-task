import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DepartmentService} from '@hdm-hospital/services/department/department.service';
import {BehaviorSubject, combineLatest, Observable, of, throwError, iif} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Department} from '@hdm-hospital/models/department';
import { MatSnackBar } from '@angular/material/snack-bar';
import {NotificationService} from '@hdm-hospital/services/notification/notification.service';

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

    private refreshSubject = new BehaviorSubject<void>(null);
    public refresh$ = this.refreshSubject.asObservable();

    public departments$: Observable<Department[]>;
    public filterValue: string;

    constructor(private departmentService: DepartmentService, private notificationService: NotificationService) {
    }

    public ngOnInit(): void {
        const updatableGrid$ = this.refresh$.pipe(switchMap(() => this.departmentService.getDepartments()));
        this.departments$ = combineLatest([updatableGrid$, this.search$]).pipe(
            mergeMap(([result, filter]) => !result.isOk
                ? throwError(result.errorMessage) : of([result.value, filter])),
            map(([items, filter]: [Department[], string]) => this.filterDepartments(items, filter)),
            catchError(err => {
                this.notificationService.showErrorMessage(err);
                return of([]);
            }),
        );
    }

    public changeFilterValue(searchValue: string): void {
        this.searchSubject.next(searchValue);
    }

    public refreshTiles(): void {
        this.refreshSubject.next();
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
