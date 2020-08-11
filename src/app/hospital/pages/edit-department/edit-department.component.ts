import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {distinctUntilChanged, filter, map, switchMap, mergeMap} from 'rxjs/operators';
import {DepartmentService} from '@hdm-hospital/services/department/department.service';
import {throwError, of} from 'rxjs';

const departmentIdKeyName = 'departmentId';

@Component({
    selector: 'hdm-edit-department',
    templateUrl: './edit-department.component.html',
    styleUrls: ['./edit-department.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDepartmentComponent implements OnInit {

    public item$ = this.route.paramMap.pipe(
        filter(p => p.has(departmentIdKeyName)),
        map(p => p.get(departmentIdKeyName)),
        switchMap(itemId => this.departmentService.getDepartmentById(itemId)),
        mergeMap(result => result.isOk ? of(result.value) : throwError(result.errorMessage)),
        distinctUntilChanged(),
    );

    constructor(private route: ActivatedRoute, private departmentService: DepartmentService) {
    }

    ngOnInit(): void {
    }

}
