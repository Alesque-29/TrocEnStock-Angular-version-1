import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteCreerComponent } from './vente-creer.component';

describe('VenteCreerComponent', () => {
  let component: VenteCreerComponent;
  let fixture: ComponentFixture<VenteCreerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenteCreerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteCreerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
