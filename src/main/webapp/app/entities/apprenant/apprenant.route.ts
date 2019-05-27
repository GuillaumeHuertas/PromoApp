import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Apprenant } from 'app/shared/model/apprenant.model';
import { ApprenantService } from './apprenant.service';
import { ApprenantComponent } from './apprenant.component';
import { ApprenantDetailComponent } from './apprenant-detail.component';
import { ApprenantUpdateComponent } from './apprenant-update.component';
import { ApprenantDeletePopupComponent } from './apprenant-delete-dialog.component';
import { IApprenant } from 'app/shared/model/apprenant.model';

@Injectable({ providedIn: 'root' })
export class ApprenantResolve implements Resolve<IApprenant> {
  constructor(private service: ApprenantService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IApprenant> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Apprenant>) => response.ok),
        map((apprenant: HttpResponse<Apprenant>) => apprenant.body)
      );
    }
    return of(new Apprenant());
  }
}

export const apprenantRoute: Routes = [
  {
    path: '',
    component: ApprenantComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Apprenants'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ApprenantDetailComponent,
    resolve: {
      apprenant: ApprenantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Apprenants'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ApprenantUpdateComponent,
    resolve: {
      apprenant: ApprenantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Apprenants'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ApprenantUpdateComponent,
    resolve: {
      apprenant: ApprenantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Apprenants'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const apprenantPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ApprenantDeletePopupComponent,
    resolve: {
      apprenant: ApprenantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Apprenants'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
