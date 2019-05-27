import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Cours } from 'app/shared/model/cours.model';
import { CoursService } from './cours.service';
import { CoursComponent } from './cours.component';
import { CoursDetailComponent } from './cours-detail.component';
import { CoursUpdateComponent } from './cours-update.component';
import { CoursDeletePopupComponent } from './cours-delete-dialog.component';
import { ICours } from 'app/shared/model/cours.model';

@Injectable({ providedIn: 'root' })
export class CoursResolve implements Resolve<ICours> {
  constructor(private service: CoursService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICours> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Cours>) => response.ok),
        map((cours: HttpResponse<Cours>) => cours.body)
      );
    }
    return of(new Cours());
  }
}

export const coursRoute: Routes = [
  {
    path: '',
    component: CoursComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cours'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CoursDetailComponent,
    resolve: {
      cours: CoursResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cours'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CoursUpdateComponent,
    resolve: {
      cours: CoursResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cours'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CoursUpdateComponent,
    resolve: {
      cours: CoursResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cours'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const coursPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CoursDeletePopupComponent,
    resolve: {
      cours: CoursResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cours'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
