/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VenteAfficherComponent } from './vente-afficher.component';

describe('VenteAfficherComponent', () => {
  let component: VenteAfficherComponent;
  let fixture: ComponentFixture<VenteAfficherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenteAfficherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteAfficherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
