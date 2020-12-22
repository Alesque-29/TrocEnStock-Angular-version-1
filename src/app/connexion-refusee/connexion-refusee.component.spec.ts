/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConnexionRefuseeComponent } from './connexion-refusee.component';

describe('ConnexionRefuseeComponent', () => {
  let component: ConnexionRefuseeComponent;
  let fixture: ComponentFixture<ConnexionRefuseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnexionRefuseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnexionRefuseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
