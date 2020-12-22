/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EnchereAfficherComponent } from './enchere-afficher.component';

describe('EnchereAfficherComponent', () => {
  let component: EnchereAfficherComponent;
  let fixture: ComponentFixture<EnchereAfficherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnchereAfficherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnchereAfficherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
