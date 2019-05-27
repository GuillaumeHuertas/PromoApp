/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PromoAppTestModule } from '../../../test.module';
import { FormationDeleteDialogComponent } from 'app/entities/formation/formation-delete-dialog.component';
import { FormationService } from 'app/entities/formation/formation.service';

describe('Component Tests', () => {
  describe('Formation Management Delete Component', () => {
    let comp: FormationDeleteDialogComponent;
    let fixture: ComponentFixture<FormationDeleteDialogComponent>;
    let service: FormationService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PromoAppTestModule],
        declarations: [FormationDeleteDialogComponent]
      })
        .overrideTemplate(FormationDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FormationDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormationService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
