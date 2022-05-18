import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailRsComponent } from './mail-rs.component';

describe('MailRsComponent', () => {
  let component: MailRsComponent;
  let fixture: ComponentFixture<MailRsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailRsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailRsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
