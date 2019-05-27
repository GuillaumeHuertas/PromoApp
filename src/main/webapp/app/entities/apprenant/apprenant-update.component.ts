import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IApprenant, Apprenant } from 'app/shared/model/apprenant.model';
import { ApprenantService } from './apprenant.service';
import { IPromo } from 'app/shared/model/promo.model';
import { PromoService } from 'app/entities/promo';
import { ICours } from 'app/shared/model/cours.model';
import { CoursService } from 'app/entities/cours';

@Component({
  selector: 'jhi-apprenant-update',
  templateUrl: './apprenant-update.component.html'
})
export class ApprenantUpdateComponent implements OnInit {
  apprenant: IApprenant;
  isSaving: boolean;

  promos: IPromo[];

  cours: ICours[];
  birthdateDp: any;

  editForm = this.fb.group({
    id: [],
    firstname: [],
    lastname: [],
    birthdate: [],
    phone: [],
    promo: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected apprenantService: ApprenantService,
    protected promoService: PromoService,
    protected coursService: CoursService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ apprenant }) => {
      this.updateForm(apprenant);
      this.apprenant = apprenant;
    });
    this.promoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPromo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPromo[]>) => response.body)
      )
      .subscribe((res: IPromo[]) => (this.promos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.coursService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICours[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICours[]>) => response.body)
      )
      .subscribe((res: ICours[]) => (this.cours = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(apprenant: IApprenant) {
    this.editForm.patchValue({
      id: apprenant.id,
      firstname: apprenant.firstname,
      lastname: apprenant.lastname,
      birthdate: apprenant.birthdate,
      phone: apprenant.phone,
      promo: apprenant.promo
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const apprenant = this.createFromForm();
    if (apprenant.id !== undefined) {
      this.subscribeToSaveResponse(this.apprenantService.update(apprenant));
    } else {
      this.subscribeToSaveResponse(this.apprenantService.create(apprenant));
    }
  }

  private createFromForm(): IApprenant {
    const entity = {
      ...new Apprenant(),
      id: this.editForm.get(['id']).value,
      firstname: this.editForm.get(['firstname']).value,
      lastname: this.editForm.get(['lastname']).value,
      birthdate: this.editForm.get(['birthdate']).value,
      phone: this.editForm.get(['phone']).value,
      promo: this.editForm.get(['promo']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApprenant>>) {
    result.subscribe((res: HttpResponse<IApprenant>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackPromoById(index: number, item: IPromo) {
    return item.id;
  }

  trackCoursById(index: number, item: ICours) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
