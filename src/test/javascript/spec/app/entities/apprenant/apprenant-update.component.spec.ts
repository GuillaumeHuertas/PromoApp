/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PromoAppTestModule } from '../../../test.module';
import { ApprenantUpdateComponent } from 'app/entities/apprenant/apprenant-update.component';
import { ApprenantService } from 'app/entities/apprenant/apprenant.service';
import { Apprenant } from 'app/shared/model/apprenant.model';

describe('Component Tests', () => {
  describe('Apprenant Management Update Component', () => {
    let comp: ApprenantUpdateComponent;
    let fixture: ComponentFixture<ApprenantUpdateComponent>;
    let service: ApprenantService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PromoAppTestModule],
        declarations: [ApprenantUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ApprenantUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ApprenantUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ApprenantService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Apprenant(123);
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
        const entity = new Apprenant();
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
