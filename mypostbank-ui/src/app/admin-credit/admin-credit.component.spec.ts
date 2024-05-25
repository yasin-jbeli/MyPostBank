import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreditComponent } from './admin-credit.component';

describe('AdminCreditComponent', () => {
  let component: AdminCreditComponent;
  let fixture: ComponentFixture<AdminCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCreditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
