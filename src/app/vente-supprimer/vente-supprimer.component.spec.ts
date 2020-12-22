import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteSupprimerComponent } from './vente-supprimer.component';

describe('VenteSupprimerComponent', () => {
  let component: VenteSupprimerComponent;
  let fixture: ComponentFixture<VenteSupprimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenteSupprimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteSupprimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
