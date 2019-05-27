import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICours } from 'app/shared/model/cours.model';
import { CoursService } from './cours.service';

@Component({
  selector: 'jhi-cours-delete-dialog',
  templateUrl: './cours-delete-dialog.component.html'
})
export class CoursDeleteDialogComponent {
  cours: ICours;

  constructor(protected coursService: CoursService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.coursService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'coursListModification',
        content: 'Deleted an cours'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-cours-delete-popup',
  template: ''
})
export class CoursDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cours }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CoursDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.cours = cours;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/cours', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/cours', { outlets: { popup: null } }]);
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
