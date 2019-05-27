/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PromoAppTestModule } from '../../../test.module';
import { CoursUpdateComponent } from 'app/entities/cours/cours-update.component';
import { CoursService } from 'app/entities/cours/cours.service';
import { Cours } from 'app/shared/model/cours.model';

describe('Component Tests', () => {
  describe('Cours Management Update Component', () => {
    let comp: CoursUpdateComponent;
    let fixture: ComponentFixture<CoursUpdateComponent>;
    let service: CoursService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PromoAppTestModule],
        declarations: [CoursUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CoursUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CoursUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CoursService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Cours(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Cours();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
