import { ICours } from 'app/shared/model/cours.model';

export interface IApprenant {
  id?: number;
  firstname?: string;
  lastname?: string;
  cours?: ICours[];
}

export class Apprenant implements IApprenant {
  constructor(public id?: number, public firstname?: string, public lastname?: string, public cours?: ICours[]) {}
}
