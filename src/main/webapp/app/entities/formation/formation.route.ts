import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Formation } from 'app/shared/model/formation.model';
import { FormationService } from './formation.service';
import { FormationComponent } from './formation.component';
import { FormationDetailComponent } from './formation-detail.component';
import { FormationUpdateComponent } from './formation-update.component';
import { FormationDeletePopupComponent } from './formation-delete-dialog.component';
import { IFormation } from 'app/shared/model/formation.model';

@Injectable({ providedIn: 'root' })
export class FormationResolve implements Resolve<IFormation> {
  constructor(private service: FormationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFormation> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Formation>) => response.ok),
        map((formation: HttpResponse<Formation>) => formation.body)
      );
    }
    return of(new Formation());
  }
}

export const formationRoute: Routes = [
  {
    path: '',
    component: FormationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Formations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FormationDetailComponent,
    resolve: {
      formation: FormationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Formations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FormationUpdateComponent,
    resolve: {
      formation: FormationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Formations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FormationUpdateComponent,
    resolve: {
      formation: FormationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Formations'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const formationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FormationDeletePopupComponent,
    resolve: {
      formation: FormationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Formations'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
