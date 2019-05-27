import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { INiveau, Niveau } from 'app/shared/model/niveau.model';
import { NiveauService } from './niveau.service';

@Component({
  selector: 'jhi-niveau-update',
  templateUrl: './niveau-update.component.html'
})
export class NiveauUpdateComponent implements OnInit {
  niveau: INiveau;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    libelle: [],
    niveau: []
  });

  constructor(protected niveauService: NiveauService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ niveau }) => {
      this.updateForm(niveau);
      this.niveau = niveau;
    });
  }

  updateForm(niveau: INiveau) {
    this.editForm.patchValue({
      id: niveau.id,
      libelle: niveau.libelle,
      niveau: niveau.niveau
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const niveau = this.createFromForm();
    if (niveau.id !== undefined) {
      this.subscribeToSaveResponse(this.niveauService.update(niveau));
    } else {
      this.subscribeToSaveResponse(this.niveauService.create(niveau));
    }
  }

  private createFromForm(): INiveau {
    const entity = {
      ...new Niveau(),
      id: this.editForm.get(['id']).value,
      libelle: this.editForm.get(['libelle']).value,
      niveau: this.editForm.get(['niveau']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INiveau>>) {
    result.subscribe((res: HttpResponse<INiveau>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
