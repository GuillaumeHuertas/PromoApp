import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IApprenant } from 'app/shared/model/apprenant.model';

type EntityResponseType = HttpResponse<IApprenant>;
type EntityArrayResponseType = HttpResponse<IApprenant[]>;

@Injectable({ providedIn: 'root' })
export class ApprenantService {
  public resourceUrl = SERVER_API_URL + 'api/apprenants';

  constructor(protected http: HttpClient) {}

  create(apprenant: IApprenant): Observable<EntityResponseType> {
    return this.http.post<IApprenant>(this.resourceUrl, apprenant, { observe: 'response' });
  }

  update(apprenant: IApprenant): Observable<EntityResponseType> {
    return this.http.put<IApprenant>(this.resourceUrl, apprenant, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IApprenant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IApprenant[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
