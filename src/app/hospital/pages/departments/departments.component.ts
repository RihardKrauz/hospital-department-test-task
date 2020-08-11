import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'hdm-departments',
    templateUrl: './departments.component.html',
    styleUrls: ['./departments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentsComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
