import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IApprenant, Apprenant } from 'app/shared/model/apprenant.model';
import { ApprenantService } from './apprenant.service';
import { ICours } from 'app/shared/model/cours.model';
import { CoursService } from 'app/entities/cours';

@Component({
  selector: 'jhi-apprenant-update',
  templateUrl: './apprenant-update.component.html'
})
export class ApprenantUpdateComponent implements OnInit {
  apprenant: IApprenant;
  isSaving: boolean;

  cours: ICours[];

  editForm = this.fb.group({
    id: [],
    firstname: [],
    lastname: [],
    cours: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected apprenantService: ApprenantService,
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
      cours: apprenant.cours
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
      cours: this.editForm.get(['cours']).value
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
