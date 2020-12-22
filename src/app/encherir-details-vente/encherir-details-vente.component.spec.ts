/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EncherirDetailsVenteComponent } from './encherir-details-vente.component';

describe('EncherirDetailsVenteComponent', () => {
  let component: EncherirDetailsVenteComponent;
  let fixture: ComponentFixture<EncherirDetailsVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncherirDetailsVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncherirDetailsVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
