import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INiveau } from 'app/shared/model/niveau.model';
import { AccountService } from 'app/core';
import { NiveauService } from './niveau.service';

@Component({
  selector: 'jhi-niveau',
  templateUrl: './niveau.component.html'
})
export class NiveauComponent implements OnInit, OnDestroy {
  niveaus: INiveau[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected niveauService: NiveauService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.niveauService
      .query()
      .pipe(
        filter((res: HttpResponse<INiveau[]>) => res.ok),
        map((res: HttpResponse<INiveau[]>) => res.body)
      )
      .subscribe(
        (res: INiveau[]) => {
          this.niveaus = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInNiveaus();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INiveau) {
    return item.id;
  }

  registerChangeInNiveaus() {
    this.eventSubscriber = this.eventManager.subscribe('niveauListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
