import { IPromo } from 'app/shared/model/promo.model';
import { ICours } from 'app/shared/model/cours.model';
import { INiveau } from 'app/shared/model/niveau.model';

export interface IFormation {
  id?: number;
  intitule?: string;
  teacher?: string;
  promos?: IPromo[];
  cours?: ICours[];
  niveau?: INiveau;
}

export class Formation implements IFormation {
  constructor(
    public id?: number,
    public intitule?: string,
    public teacher?: string,
    public promos?: IPromo[],
    public cours?: ICours[],
    public niveau?: INiveau
  ) {}
}
