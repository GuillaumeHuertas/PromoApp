import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICours } from 'app/shared/model/cours.model';

@Component({
  selector: 'jhi-cours-detail',
  templateUrl: './cours-detail.component.html'
})
export class CoursDetailComponent implements OnInit {
  cours: ICours;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cours }) => {
      this.cours = cours;
    });
  }

  previousState() {
    window.history.back();
  }
}
