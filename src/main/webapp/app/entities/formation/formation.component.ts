import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFormation } from 'app/shared/model/formation.model';
import { AccountService } from 'app/core';
import { FormationService } from './formation.service';

@Component({
  selector: 'jhi-formation',
  templateUrl: './formation.component.html'
})
export class FormationComponent implements OnInit, OnDestroy {
  formations: IFormation[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected formationService: FormationService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.formationService
      .query()
      .pipe(
        filter((res: HttpResponse<IFormation[]>) => res.ok),
        map((res: HttpResponse<IFormation[]>) => res.body)
      )
      .subscribe(
        (res: IFormation[]) => {
          this.formations = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFormations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFormation) {
    return item.id;
  }

  registerChangeInFormations() {
    this.eventSubscriber = this.eventManager.subscribe('formationListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
