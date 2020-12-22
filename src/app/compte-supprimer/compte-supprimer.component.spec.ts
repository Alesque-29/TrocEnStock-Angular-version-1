/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompteSupprimerComponent } from './compte-supprimer.component';

describe('CompteSupprimerComponent', () => {
  let component: CompteSupprimerComponent;
  let fixture: ComponentFixture<CompteSupprimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteSupprimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteSupprimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
