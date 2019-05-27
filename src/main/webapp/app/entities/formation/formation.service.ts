import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFormation } from 'app/shared/model/formation.model';

type EntityResponseType = HttpResponse<IFormation>;
type EntityArrayResponseType = HttpResponse<IFormation[]>;

@Injectable({ providedIn: 'root' })
export class FormationService {
  public resourceUrl = SERVER_API_URL + 'api/formations';

  constructor(protected http: HttpClient) {}

  create(formation: IFormation): Observable<EntityResponseType> {
    return this.http.post<IFormation>(this.resourceUrl, formation, { observe: 'response' });
  }

  update(formation: IFormation): Observable<EntityResponseType> {
    return this.http.put<IFormation>(this.resourceUrl, formation, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFormation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
