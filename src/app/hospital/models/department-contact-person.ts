import {CustomField} from './custom-field';

export interface DepartmentContactPerson {
  name: string;
  telephone: string;
  email: string;
  extraFields?: CustomField<string>[];
}
