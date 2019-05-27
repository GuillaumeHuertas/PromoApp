/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PromoAppTestModule } from '../../../test.module';
import { ApprenantComponent } from 'app/entities/apprenant/apprenant.component';
import { ApprenantService } from 'app/entities/apprenant/apprenant.service';
import { Apprenant } from 'app/shared/model/apprenant.model';

describe('Component Tests', () => {
  describe('Apprenant Management Component', () => {
    let comp: ApprenantComponent;
    let fixture: ComponentFixture<ApprenantComponent>;
    let service: ApprenantService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PromoAppTestModule],
        declarations: [ApprenantComponent],
        providers: []
      })
        .overrideTemplate(ApprenantComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ApprenantComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ApprenantService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Apprenant(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.apprenants[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
