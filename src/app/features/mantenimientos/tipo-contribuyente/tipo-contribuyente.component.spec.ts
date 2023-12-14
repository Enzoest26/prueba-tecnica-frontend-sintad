import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoContribuyenteComponent } from './tipo-contribuyente.component';

describe('TipoContribuyenteComponent', () => {
  let component: TipoContribuyenteComponent;
  let fixture: ComponentFixture<TipoContribuyenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoContribuyenteComponent]
    });
    fixture = TestBed.createComponent(TipoContribuyenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
