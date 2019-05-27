import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PromoAppSharedModule } from 'app/shared';
import {
  ApprenantComponent,
  ApprenantDetailComponent,
  ApprenantUpdateComponent,
  ApprenantDeletePopupComponent,
  ApprenantDeleteDialogComponent,
  apprenantRoute,
  apprenantPopupRoute
} from './';

const ENTITY_STATES = [...apprenantRoute, ...apprenantPopupRoute];

@NgModule({
  imports: [PromoAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ApprenantComponent,
    ApprenantDetailComponent,
    ApprenantUpdateComponent,
    ApprenantDeleteDialogComponent,
    ApprenantDeletePopupComponent
  ],
  entryComponents: [ApprenantComponent, ApprenantUpdateComponent, ApprenantDeleteDialogComponent, ApprenantDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PromoAppApprenantModule {}
