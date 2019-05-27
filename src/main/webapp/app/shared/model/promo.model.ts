import { Moment } from 'moment';
import { IApprenant } from 'app/shared/model/apprenant.model';
import { IFormation } from 'app/shared/model/formation.model';

export interface IPromo {
  id?: number;
  code?: string;
  start?: Moment;
  end?: Moment;
  apprenants?: IApprenant[];
  formation?: IFormation;
}

export class Promo implements IPromo {
  constructor(
    public id?: number,
    public code?: string,
    public start?: Moment,
    public end?: Moment,
    public apprenants?: IApprenant[],
    public formation?: IFormation
  ) {}
}
