import { IFormation } from 'app/shared/model/formation.model';

export interface INiveau {
  id?: number;
  libelle?: string;
  niveau?: string;
  formations?: IFormation[];
}

export class Niveau implements INiveau {
  constructor(public id?: number, public libelle?: string, public niveau?: string, public formations?: IFormation[]) {}
}
