/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PromoAppTestModule } from '../../../test.module';
import { CoursDeleteDialogComponent } from 'app/entities/cours/cours-delete-dialog.component';
import { CoursService } from 'app/entities/cours/cours.service';

describe('Component Tests', () => {
  describe('Cours Management Delete Component', () => {
    let comp: CoursDeleteDialogComponent;
    let fixture: ComponentFixture<CoursDeleteDialogComponent>;
    let service: CoursService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PromoAppTestModule],
        declarations: [CoursDeleteDialogComponent]
      })
        .overrideTemplate(CoursDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CoursDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CoursService);
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
