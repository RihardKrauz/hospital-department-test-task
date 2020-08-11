import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Department} from '@hdm-hospital/models/department';
import {Router} from '@angular/router';
import {DepartmentService} from '@hdm-hospital/services/department/department.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'hdm-department-tile',
    templateUrl: './department-tile.component.html',
    styleUrls: ['./department-tile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentTileComponent implements OnInit, OnDestroy {
    private subs = new Subscription();
    @Input() item: Department;

    constructor(private router: Router, private departmentService: DepartmentService) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    public deleteItem(e: Event, id: string): void {
        // todo: notify success / error handling / loader / refresh grid
        this.subs.add(this.departmentService.removeDepartmentById(id).subscribe());
    }

}
