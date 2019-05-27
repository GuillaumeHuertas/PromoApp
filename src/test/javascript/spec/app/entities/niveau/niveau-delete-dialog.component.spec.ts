/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PromoAppTestModule } from '../../../test.module';
import { NiveauDeleteDialogComponent } from 'app/entities/niveau/niveau-delete-dialog.component';
import { NiveauService } from 'app/entities/niveau/niveau.service';

describe('Component Tests', () => {
  describe('Niveau Management Delete Component', () => {
    let comp: NiveauDeleteDialogComponent;
    let fixture: ComponentFixture<NiveauDeleteDialogComponent>;
    let service: NiveauService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PromoAppTestModule],
        declarations: [NiveauDeleteDialogComponent]
      })
        .overrideTemplate(NiveauDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NiveauDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NiveauService);
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
