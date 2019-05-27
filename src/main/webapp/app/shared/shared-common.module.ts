import { NgModule } from '@angular/core';

import { PromoAppSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [PromoAppSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [PromoAppSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class PromoAppSharedCommonModule {}
