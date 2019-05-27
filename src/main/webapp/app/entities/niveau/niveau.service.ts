import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INiveau } from 'app/shared/model/niveau.model';

type EntityResponseType = HttpResponse<INiveau>;
type EntityArrayResponseType = HttpResponse<INiveau[]>;

@Injectable({ providedIn: 'root' })
export class NiveauService {
  public resourceUrl = SERVER_API_URL + 'api/niveaus';

  constructor(protected http: HttpClient) {}

  create(niveau: INiveau): Observable<EntityResponseType> {
    return this.http.post<INiveau>(this.resourceUrl, niveau, { observe: 'response' });
  }

  update(niveau: INiveau): Observable<EntityResponseType> {
    return this.http.put<INiveau>(this.resourceUrl, niveau, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INiveau>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INiveau[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
