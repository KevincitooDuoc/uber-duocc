import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasajePage } from './pasaje.page';

describe('PasajePage', () => {
  let component: PasajePage;
  let fixture: ComponentFixture<PasajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PasajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
