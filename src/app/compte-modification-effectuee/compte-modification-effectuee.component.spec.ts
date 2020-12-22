/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompteModificationEffectueeComponent } from './compte-modification-effectuee.component';

describe('CompteModificationEffectueeComponent', () => {
  let component: CompteModificationEffectueeComponent;
  let fixture: ComponentFixture<CompteModificationEffectueeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteModificationEffectueeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteModificationEffectueeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
