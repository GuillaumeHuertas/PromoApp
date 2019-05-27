import { IApprenant } from 'app/shared/model/apprenant.model';

export interface ICours {
  id?: number;
  name?: string;
  numberStudent?: number;
  teacher?: string;
  apprenants?: IApprenant[];
}

export class Cours implements ICours {
  constructor(
    public id?: number,
    public name?: string,
    public numberStudent?: number,
    public teacher?: string,
    public apprenants?: IApprenant[]
  ) {}
}
