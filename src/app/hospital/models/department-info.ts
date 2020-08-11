import {CustomField} from './custom-field';

export interface DepartmentInfo {
  name: string;
  apiKey: string;
  extraFields?: CustomField<string>[];
}
