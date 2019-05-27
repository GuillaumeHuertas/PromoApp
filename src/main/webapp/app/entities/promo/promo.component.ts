import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPromo } from 'app/shared/model/promo.model';
import { AccountService } from 'app/core';
import { PromoService } from './promo.service';

@Component({
  selector: 'jhi-promo',
  templateUrl: './promo.component.html'
})
export class PromoComponent implements OnInit, OnDestroy {
  promos: IPromo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected promoService: PromoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.promoService
      .query()
      .pipe(
        filter((res: HttpResponse<IPromo[]>) => res.ok),
        map((res: HttpResponse<IPromo[]>) => res.body)
      )
      .subscribe(
        (res: IPromo[]) => {
          this.promos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPromos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPromo) {
    return item.id;
  }

  registerChangeInPromos() {
    this.eventSubscriber = this.eventManager.subscribe('promoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
