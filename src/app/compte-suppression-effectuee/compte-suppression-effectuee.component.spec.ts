/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompteSuppressionEffectueeComponent } from './compte-suppression-effectuee.component';

describe('CompteSuppressionEffectueeComponent', () => {
  let component: CompteSuppressionEffectueeComponent;
  let fixture: ComponentFixture<CompteSuppressionEffectueeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteSuppressionEffectueeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteSuppressionEffectueeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
