/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PromoAppTestModule } from '../../../test.module';
import { ApprenantDetailComponent } from 'app/entities/apprenant/apprenant-detail.component';
import { Apprenant } from 'app/shared/model/apprenant.model';

describe('Component Tests', () => {
  describe('Apprenant Management Detail Component', () => {
    let comp: ApprenantDetailComponent;
    let fixture: ComponentFixture<ApprenantDetailComponent>;
    const route = ({ data: of({ apprenant: new Apprenant(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PromoAppTestModule],
        declarations: [ApprenantDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ApprenantDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ApprenantDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.apprenant).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
