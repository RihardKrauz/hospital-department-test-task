import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'hdm-create-department',
    templateUrl: './create-department.component.html',
    styleUrls: ['./create-department.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDepartmentComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
