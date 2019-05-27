import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INiveau } from 'app/shared/model/niveau.model';
import { NiveauService } from './niveau.service';

@Component({
  selector: 'jhi-niveau-delete-dialog',
  templateUrl: './niveau-delete-dialog.component.html'
})
export class NiveauDeleteDialogComponent {
  niveau: INiveau;

  constructor(protected niveauService: NiveauService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.niveauService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'niveauListModification',
        content: 'Deleted an niveau'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-niveau-delete-popup',
  template: ''
})
export class NiveauDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ niveau }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NiveauDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.niveau = niveau;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/niveau', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/niveau', { outlets: { popup: null } }]);
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
