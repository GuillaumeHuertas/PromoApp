import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFormation } from 'app/shared/model/formation.model';

@Component({
  selector: 'jhi-formation-detail',
  templateUrl: './formation-detail.component.html'
})
export class FormationDetailComponent implements OnInit {
  formation: IFormation;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ formation }) => {
      this.formation = formation;
    });
  }

  previousState() {
    window.history.back();
  }
}
