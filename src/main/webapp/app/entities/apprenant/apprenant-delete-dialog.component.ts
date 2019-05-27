import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IApprenant } from 'app/shared/model/apprenant.model';
import { ApprenantService } from './apprenant.service';

@Component({
  selector: 'jhi-apprenant-delete-dialog',
  templateUrl: './apprenant-delete-dialog.component.html'
})
export class ApprenantDeleteDialogComponent {
  apprenant: IApprenant;

  constructor(protected apprenantService: ApprenantService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.apprenantService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'apprenantListModification',
        content: 'Deleted an apprenant'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-apprenant-delete-popup',
  template: ''
})
export class ApprenantDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ apprenant }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ApprenantDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.apprenant = apprenant;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/apprenant', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/apprenant', { outlets: { popup: null } }]);
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
