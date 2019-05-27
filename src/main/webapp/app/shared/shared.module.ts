import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PromoAppSharedLibsModule, PromoAppSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [PromoAppSharedLibsModule, PromoAppSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [PromoAppSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PromoAppSharedModule {
  static forRoot() {
    return {
      ngModule: PromoAppSharedModule
    };
  }
}
