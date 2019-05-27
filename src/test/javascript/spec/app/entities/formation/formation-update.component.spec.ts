/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PromoAppTestModule } from '../../../test.module';
import { FormationUpdateComponent } from 'app/entities/formation/formation-update.component';
import { FormationService } from 'app/entities/formation/formation.service';
import { Formation } from 'app/shared/model/formation.model';

describe('Component Tests', () => {
  describe('Formation Management Update Component', () => {
    let comp: FormationUpdateComponent;
    let fixture: ComponentFixture<FormationUpdateComponent>;
    let service: FormationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PromoAppTestModule],
        declarations: [FormationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FormationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Formation(123);
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
        const entity = new Formation();
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
