/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompteModifierComponent } from './compte-modifier.component';

describe('CompteModifierComponent', () => {
  let component: CompteModifierComponent;
  let fixture: ComponentFixture<CompteModifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteModifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
