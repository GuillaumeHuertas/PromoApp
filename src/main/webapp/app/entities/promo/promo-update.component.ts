import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IPromo, Promo } from 'app/shared/model/promo.model';
import { PromoService } from './promo.service';
import { IFormation } from 'app/shared/model/formation.model';
import { FormationService } from 'app/entities/formation';

@Component({
  selector: 'jhi-promo-update',
  templateUrl: './promo-update.component.html'
})
export class PromoUpdateComponent implements OnInit {
  promo: IPromo;
  isSaving: boolean;

  formations: IFormation[];
  startDp: any;
  endDp: any;

  editForm = this.fb.group({
    id: [],
    code: [],
    start: [],
    end: [],
    formation: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected promoService: PromoService,
    protected formationService: FormationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ promo }) => {
      this.updateForm(promo);
      this.promo = promo;
    });
    this.formationService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFormation[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFormation[]>) => response.body)
      )
      .subscribe((res: IFormation[]) => (this.formations = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(promo: IPromo) {
    this.editForm.patchValue({
      id: promo.id,
      code: promo.code,
      start: promo.start,
      end: promo.end,
      formation: promo.formation
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const promo = this.createFromForm();
    if (promo.id !== undefined) {
      this.subscribeToSaveResponse(this.promoService.update(promo));
    } else {
      this.subscribeToSaveResponse(this.promoService.create(promo));
    }
  }

  private createFromForm(): IPromo {
    const entity = {
      ...new Promo(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      start: this.editForm.get(['start']).value,
      end: this.editForm.get(['end']).value,
      formation: this.editForm.get(['formation']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPromo>>) {
    result.subscribe((res: HttpResponse<IPromo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackFormationById(index: number, item: IFormation) {
    return item.id;
  }
}
