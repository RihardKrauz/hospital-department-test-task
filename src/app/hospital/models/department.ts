import {DepartmentInfo} from './department-info';
import {DepartmentContactPerson} from './department-contact-person';

export interface Department {
  id: string;
  info: DepartmentInfo;
  contactPerson: DepartmentContactPerson;
}
