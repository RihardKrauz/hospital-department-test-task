import {Observable, of, throwError} from 'rxjs';
import {ServiceError} from '@hdm-hospital/models/service-error';
import {catchError, mergeMap} from 'rxjs/operators';

export interface MethodResult<T> {
    isOk: boolean;
    errorMessage?: string;
    value?: T;
}

export class SuccessMethodResult<T> implements MethodResult<T> {
    public isOk = true;
    public value: T;

    constructor(value: T) {
        this.value = value;
    }
}

export class ErrorMethodResult<T> implements MethodResult<T> {
    public isOk = false;
    public errorMessage: string;
    public value: T;

    constructor(error: string) {
        this.errorMessage = error;
    }
}

export function mapMethodResultToValue<T>(source: Observable<MethodResult<T>>): Observable<T | ServiceError> {
    return source.pipe(
        mergeMap(itemsResult => itemsResult.isOk ? of(itemsResult.value) : throwError(itemsResult.errorMessage)),
        catchError(err => {
            console.error(err);
            return of({ text: err });
        }),
    );
}

