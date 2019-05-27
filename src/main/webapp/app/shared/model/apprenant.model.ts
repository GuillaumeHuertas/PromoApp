import { Moment } from 'moment';
import { IPromo } from 'app/shared/model/promo.model';
import { ICours } from 'app/shared/model/cours.model';

export interface IApprenant {
  id?: number;
  firstname?: string;
  lastname?: string;
  birthdate?: Moment;
  phone?: string;
  promo?: IPromo;
  cours?: ICours[];
}

export class Apprenant implements IApprenant {
  constructor(
    public id?: number,
    public firstname?: string,
    public lastname?: string,
    public birthdate?: Moment,
    public phone?: string,
    public promo?: IPromo,
    public cours?: ICours[]
  ) {}
}
