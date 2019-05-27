/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PromoAppTestModule } from '../../../test.module';
import { CoursComponent } from 'app/entities/cours/cours.component';
import { CoursService } from 'app/entities/cours/cours.service';
import { Cours } from 'app/shared/model/cours.model';

describe('Component Tests', () => {
  describe('Cours Management Component', () => {
    let comp: CoursComponent;
    let fixture: ComponentFixture<CoursComponent>;
    let service: CoursService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PromoAppTestModule],
        declarations: [CoursComponent],
        providers: []
      })
        .overrideTemplate(CoursComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CoursComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CoursService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Cours(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cours[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
