import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApprenant } from 'app/shared/model/apprenant.model';

@Component({
  selector: 'jhi-apprenant-detail',
  templateUrl: './apprenant-detail.component.html'
})
export class ApprenantDetailComponent implements OnInit {
  apprenant: IApprenant;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ apprenant }) => {
      this.apprenant = apprenant;
    });
  }

  previousState() {
    window.history.back();
  }
}
