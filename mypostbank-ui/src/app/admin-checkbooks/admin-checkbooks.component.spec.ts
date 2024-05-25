import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCheckbooksComponent } from './admin-checkbooks.component';

describe('AdminCheckbooksComponent', () => {
  let component: AdminCheckbooksComponent;
  let fixture: ComponentFixture<AdminCheckbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCheckbooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCheckbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
