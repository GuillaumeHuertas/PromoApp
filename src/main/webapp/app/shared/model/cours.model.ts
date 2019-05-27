export interface ICours {
  id?: number;
  name?: string;
  numberStudent?: number;
  teacher?: string;
}

export class Cours implements ICours {
  constructor(public id?: number, public name?: string, public numberStudent?: number, public teacher?: string) {}
}
