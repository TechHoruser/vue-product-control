import { Moment } from 'moment';

export interface Medicine {
  name: string;
  expiredDate: Moment;
  amount: number;
}
