/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AcquisitionSuiteMaVenteComponent } from './acquisition-suite-ma-vente.component';

describe('AcquisitionSuiteMaVenteComponent', () => {
  let component: AcquisitionSuiteMaVenteComponent;
  let fixture: ComponentFixture<AcquisitionSuiteMaVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquisitionSuiteMaVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquisitionSuiteMaVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
