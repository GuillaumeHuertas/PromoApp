import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFormation } from 'app/shared/model/formation.model';
import { FormationService } from './formation.service';

@Component({
  selector: 'jhi-formation-delete-dialog',
  templateUrl: './formation-delete-dialog.component.html'
})
export class FormationDeleteDialogComponent {
  formation: IFormation;

  constructor(protected formationService: FormationService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.formationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'formationListModification',
        content: 'Deleted an formation'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-formation-delete-popup',
  template: ''
})
export class FormationDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ formation }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FormationDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.formation = formation;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/formation', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/formation', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
