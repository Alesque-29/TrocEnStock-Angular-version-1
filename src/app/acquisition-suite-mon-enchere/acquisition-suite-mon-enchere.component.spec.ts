/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AcquisitionSuiteMonEnchereComponent } from './acquisition-suite-mon-enchere.component';

describe('AcquisitionSuiteMonEnchereComponent', () => {
  let component: AcquisitionSuiteMonEnchereComponent;
  let fixture: ComponentFixture<AcquisitionSuiteMonEnchereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquisitionSuiteMonEnchereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquisitionSuiteMonEnchereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
