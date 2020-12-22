/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompteAfficherComponent } from './compte-afficher.component';

describe('CompteAfficherComponent', () => {
  let component: CompteAfficherComponent;
  let fixture: ComponentFixture<CompteAfficherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteAfficherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteAfficherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
