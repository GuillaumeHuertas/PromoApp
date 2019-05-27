import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IApprenant } from 'app/shared/model/apprenant.model';
import { AccountService } from 'app/core';
import { ApprenantService } from './apprenant.service';

@Component({
  selector: 'jhi-apprenant',
  templateUrl: './apprenant.component.html'
})
export class ApprenantComponent implements OnInit, OnDestroy {
  apprenants: IApprenant[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected apprenantService: ApprenantService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.apprenantService
      .query()
      .pipe(
        filter((res: HttpResponse<IApprenant[]>) => res.ok),
        map((res: HttpResponse<IApprenant[]>) => res.body)
      )
      .subscribe(
        (res: IApprenant[]) => {
          this.apprenants = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInApprenants();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IApprenant) {
    return item.id;
  }

  registerChangeInApprenants() {
    this.eventSubscriber = this.eventManager.subscribe('apprenantListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
