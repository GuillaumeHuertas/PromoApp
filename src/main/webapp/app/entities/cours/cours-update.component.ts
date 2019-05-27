import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICours, Cours } from 'app/shared/model/cours.model';
import { CoursService } from './cours.service';
import { IApprenant } from 'app/shared/model/apprenant.model';
import { ApprenantService } from 'app/entities/apprenant';
import { IFormation } from 'app/shared/model/formation.model';
import { FormationService } from 'app/entities/formation';

@Component({
  selector: 'jhi-cours-update',
  templateUrl: './cours-update.component.html'
})
export class CoursUpdateComponent implements OnInit {
  cours: ICours;
  isSaving: boolean;

  apprenants: IApprenant[];

  formations: IFormation[];

  editForm = this.fb.group({
    id: [],
    name: [],
    numberStudent: [],
    teacher: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected coursService: CoursService,
    protected apprenantService: ApprenantService,
    protected formationService: FormationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cours }) => {
      this.updateForm(cours);
      this.cours = cours;
    });
    this.apprenantService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IApprenant[]>) => mayBeOk.ok),
        map((response: HttpResponse<IApprenant[]>) => response.body)
      )
      .subscribe((res: IApprenant[]) => (this.apprenants = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.formationService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFormation[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFormation[]>) => response.body)
      )
      .subscribe((res: IFormation[]) => (this.formations = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(cours: ICours) {
    this.editForm.patchValue({
      id: cours.id,
      name: cours.name,
      numberStudent: cours.numberStudent,
      teacher: cours.teacher
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cours = this.createFromForm();
    if (cours.id !== undefined) {
      this.subscribeToSaveResponse(this.coursService.update(cours));
    } else {
      this.subscribeToSaveResponse(this.coursService.create(cours));
    }
  }

  private createFromForm(): ICours {
    const entity = {
      ...new Cours(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      numberStudent: this.editForm.get(['numberStudent']).value,
      teacher: this.editForm.get(['teacher']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICours>>) {
    result.subscribe((res: HttpResponse<ICours>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackApprenantById(index: number, item: IApprenant) {
    return item.id;
  }

  trackFormationById(index: number, item: IFormation) {
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
