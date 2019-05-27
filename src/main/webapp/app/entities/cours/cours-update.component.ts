import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICours, Cours } from 'app/shared/model/cours.model';
import { CoursService } from './cours.service';

@Component({
  selector: 'jhi-cours-update',
  templateUrl: './cours-update.component.html'
})
export class CoursUpdateComponent implements OnInit {
  cours: ICours;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [],
    numberStudent: [],
    teacher: []
  });

  constructor(protected coursService: CoursService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cours }) => {
      this.updateForm(cours);
      this.cours = cours;
    });
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
}
