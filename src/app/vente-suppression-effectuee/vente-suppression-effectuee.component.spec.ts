/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VenteSuppressionEffectueeComponent } from './vente-suppression-effectuee.component';

describe('VenteSuppressionEffectueeComponent', () => {
  let component: VenteSuppressionEffectueeComponent;
  let fixture: ComponentFixture<VenteSuppressionEffectueeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenteSuppressionEffectueeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteSuppressionEffectueeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
