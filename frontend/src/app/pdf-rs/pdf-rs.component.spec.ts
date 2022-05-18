import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfRsComponent } from './pdf-rs.component';

describe('PdfRsComponent', () => {
  let component: PdfRsComponent;
  let fixture: ComponentFixture<PdfRsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfRsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfRsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
