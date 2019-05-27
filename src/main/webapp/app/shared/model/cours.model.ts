import { IApprenant } from 'app/shared/model/apprenant.model';
import { IFormation } from 'app/shared/model/formation.model';

export interface ICours {
  id?: number;
  theme?: string;
  duration?: number;
  apprenants?: IApprenant[];
  formations?: IFormation[];
}

export class Cours implements ICours {
  constructor(
    public id?: number,
    public theme?: string,
    public duration?: number,
    public apprenants?: IApprenant[],
    public formations?: IFormation[]
  ) {}
}
