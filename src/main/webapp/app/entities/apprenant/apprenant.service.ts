import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

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
    const copy = this.convertDateFromClient(apprenant);
    return this.http
      .post<IApprenant>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(apprenant: IApprenant): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(apprenant);
    return this.http
      .put<IApprenant>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IApprenant>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IApprenant[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(apprenant: IApprenant): IApprenant {
    const copy: IApprenant = Object.assign({}, apprenant, {
      birthdate: apprenant.birthdate != null && apprenant.birthdate.isValid() ? apprenant.birthdate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.birthdate = res.body.birthdate != null ? moment(res.body.birthdate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((apprenant: IApprenant) => {
        apprenant.birthdate = apprenant.birthdate != null ? moment(apprenant.birthdate) : null;
      });
    }
    return res;
  }
}
