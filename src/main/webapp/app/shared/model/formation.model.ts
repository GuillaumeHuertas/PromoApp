import { ICours } from 'app/shared/model/cours.model';

export interface IFormation {
  id?: number;
  intitule?: string;
  cours?: ICours[];
}

export class Formation implements IFormation {
  constructor(public id?: number, public intitule?: string, public cours?: ICours[]) {}
}
