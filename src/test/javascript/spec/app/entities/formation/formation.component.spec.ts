/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PromoAppTestModule } from '../../../test.module';
import { FormationComponent } from 'app/entities/formation/formation.component';
import { FormationService } from 'app/entities/formation/formation.service';
import { Formation } from 'app/shared/model/formation.model';

describe('Component Tests', () => {
  describe('Formation Management Component', () => {
    let comp: FormationComponent;
    let fixture: ComponentFixture<FormationComponent>;
    let service: FormationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PromoAppTestModule],
        declarations: [FormationComponent],
        providers: []
      })
        .overrideTemplate(FormationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Formation(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.formations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
