import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INiveau } from 'app/shared/model/niveau.model';

@Component({
  selector: 'jhi-niveau-detail',
  templateUrl: './niveau-detail.component.html'
})
export class NiveauDetailComponent implements OnInit {
  niveau: INiveau;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ niveau }) => {
      this.niveau = niveau;
    });
  }

  previousState() {
    window.history.back();
  }
}
