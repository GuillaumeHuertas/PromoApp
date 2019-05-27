import { IApprenant } from 'app/shared/model/apprenant.model';
import { IFormation } from 'app/shared/model/formation.model';

export interface ICours {
  id?: number;
  name?: string;
  numberStudent?: number;
  teacher?: string;
  apprenants?: IApprenant[];
  formations?: IFormation[];
}

export class Cours implements ICours {
  constructor(
    public id?: number,
    public name?: string,
    public numberStudent?: number,
    public teacher?: string,
    public apprenants?: IApprenant[],
    public formations?: IFormation[]
  ) {}
}
