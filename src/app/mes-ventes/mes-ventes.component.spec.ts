/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MesVentesComponent } from './mes-ventes.component';

describe('MesVentesComponent', () => {
  let component: MesVentesComponent;
  let fixture: ComponentFixture<MesVentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesVentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesVentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
