import {Injectable} from '@angular/core';
import {Department} from '@hdm-hospital/models/department';
import {CustomFieldsCollection} from '@hdm-hospital/models/custom-fields-collection';
import {Observable, of, throwError} from 'rxjs';
import {ErrorMethodResult, MethodResult, SuccessMethodResult, mapMethodResultToValue} from '@hdm-hospital/models/method-result';
import {catchError, map, mergeMap} from 'rxjs/operators';

let departments: Department[] = [
    {
        id: '7dc53df5-703e-49b3-8670-b1c468f47f1f',
        info: {name: 'Cardiology', apiKey: '55555df5-703e-49b3-8670-b1c468f47f1f', extraFields: []},
        contactPerson: {name: 'Evgeniy Chkalov', email: 'echkalov@gmail.com', telephone: '+79052262767', extraFields: []},

    },
    {
        id: 'ddc542f5-803e-49b3-8670-b1c468111f1f',
        info: {name: 'Oncology', apiKey: '444442f5-803e-49b3-8670-b1c468111f1f', extraFields: []},
        contactPerson: {name: 'Rihard Krauz', email: 'rihardkrauz@gmail.com', telephone: '89056685454', extraFields: []}
    }
];

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {

    public getDepartments(): Observable<MethodResult<Department[]>> {
        return of(new SuccessMethodResult(departments));
    }

    public getDepartmentById(id: string): Observable<MethodResult<Department>> {
        // tslint:disable-next-line:triple-equals
        const department = departments.find(d => d.id == id);
        return department ? of(new SuccessMethodResult(department)) : of(new ErrorMethodResult(`Cannot find department with id = ${id}`));
    }

    public addDepartment(item: Department): Observable<MethodResult<Department>> {
        departments.push(item);
        return of(new SuccessMethodResult(item));
    }

    public editDepartment(targetDepartmentId: string, departmentItem: Department): Observable<MethodResult<Department>> {
        const department = departments.find(d => d.id === targetDepartmentId);
        if (!department) {
            return of(new ErrorMethodResult(`Cannot find department with id = ${targetDepartmentId}`));
        }

        for (const depField in departmentItem) {
            if (!departmentItem.hasOwnProperty(depField)) {
                continue;
            }

            department[depField] = departmentItem[depField];
        }

        return of(new SuccessMethodResult({...departmentItem, id: targetDepartmentId}));
    }

    public removeDepartmentById(id: string): Observable<MethodResult<string>> {
        departments = departments.filter(d => d.id !== id);

        return of(new SuccessMethodResult('Item has been successfully removed'));
    }

    public getCustomFields(): Observable<MethodResult<CustomFieldsCollection>> {
        const getCustomFieldsByField = (fieldName: string) => departments

            // get custom fields names
            .map(d => d[fieldName].extraFields.map(cf => cf.name))

            // flatten them
            .reduce((arr, cur) => [...arr, ...cur], [])

            // distinct unique
            .reduce((arr, cur) => arr.indexOf(cur) === -1 ? [...arr, cur] : arr, []);

        return of(new SuccessMethodResult({
            info: getCustomFieldsByField('info'),
            contactPerson: getCustomFieldsByField('contactPerson')
        }));
    }

}
