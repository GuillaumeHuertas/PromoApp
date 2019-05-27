import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PromoAppSharedModule } from 'app/shared';
import {
  PromoComponent,
  PromoDetailComponent,
  PromoUpdateComponent,
  PromoDeletePopupComponent,
  PromoDeleteDialogComponent,
  promoRoute,
  promoPopupRoute
} from './';

const ENTITY_STATES = [...promoRoute, ...promoPopupRoute];

@NgModule({
  imports: [PromoAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PromoComponent, PromoDetailComponent, PromoUpdateComponent, PromoDeleteDialogComponent, PromoDeletePopupComponent],
  entryComponents: [PromoComponent, PromoUpdateComponent, PromoDeleteDialogComponent, PromoDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PromoAppPromoModule {}
