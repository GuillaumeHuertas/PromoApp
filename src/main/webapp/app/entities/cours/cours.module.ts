import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PromoAppSharedModule } from 'app/shared';
import {
  CoursComponent,
  CoursDetailComponent,
  CoursUpdateComponent,
  CoursDeletePopupComponent,
  CoursDeleteDialogComponent,
  coursRoute,
  coursPopupRoute
} from './';

const ENTITY_STATES = [...coursRoute, ...coursPopupRoute];

@NgModule({
  imports: [PromoAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CoursComponent, CoursDetailComponent, CoursUpdateComponent, CoursDeleteDialogComponent, CoursDeletePopupComponent],
  entryComponents: [CoursComponent, CoursUpdateComponent, CoursDeleteDialogComponent, CoursDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PromoAppCoursModule {}
