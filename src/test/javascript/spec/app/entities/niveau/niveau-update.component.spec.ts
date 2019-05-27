/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PromoAppTestModule } from '../../../test.module';
import { NiveauUpdateComponent } from 'app/entities/niveau/niveau-update.component';
import { NiveauService } from 'app/entities/niveau/niveau.service';
import { Niveau } from 'app/shared/model/niveau.model';

describe('Component Tests', () => {
  describe('Niveau Management Update Component', () => {
    let comp: NiveauUpdateComponent;
    let fixture: ComponentFixture<NiveauUpdateComponent>;
    let service: NiveauService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PromoAppTestModule],
        declarations: [NiveauUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NiveauUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NiveauUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NiveauService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Niveau(123);
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
        const entity = new Niveau();
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
