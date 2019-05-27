import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFormation, Formation } from 'app/shared/model/formation.model';
import { FormationService } from './formation.service';
import { ICours } from 'app/shared/model/cours.model';
import { CoursService } from 'app/entities/cours';

@Component({
  selector: 'jhi-formation-update',
  templateUrl: './formation-update.component.html'
})
export class FormationUpdateComponent implements OnInit {
  formation: IFormation;
  isSaving: boolean;

  cours: ICours[];

  editForm = this.fb.group({
    id: [],
    intitule: [],
    cours: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected formationService: FormationService,
    protected coursService: CoursService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ formation }) => {
      this.updateForm(formation);
      this.formation = formation;
    });
    this.coursService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICours[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICours[]>) => response.body)
      )
      .subscribe((res: ICours[]) => (this.cours = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(formation: IFormation) {
    this.editForm.patchValue({
      id: formation.id,
      intitule: formation.intitule,
      cours: formation.cours
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const formation = this.createFromForm();
    if (formation.id !== undefined) {
      this.subscribeToSaveResponse(this.formationService.update(formation));
    } else {
      this.subscribeToSaveResponse(this.formationService.create(formation));
    }
  }

  private createFromForm(): IFormation {
    const entity = {
      ...new Formation(),
      id: this.editForm.get(['id']).value,
      intitule: this.editForm.get(['intitule']).value,
      cours: this.editForm.get(['cours']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormation>>) {
    result.subscribe((res: HttpResponse<IFormation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
