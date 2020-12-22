/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MesEncheresComponent } from './mes-encheres.component';

describe('MesEncheresComponent', () => {
  let component: MesEncheresComponent;
  let fixture: ComponentFixture<MesEncheresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesEncheresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesEncheresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
