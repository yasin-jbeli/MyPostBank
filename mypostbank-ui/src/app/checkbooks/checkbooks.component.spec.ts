import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckbooksComponent } from './checkbooks.component';

describe('CheckbooksComponent', () => {
  let component: CheckbooksComponent;
  let fixture: ComponentFixture<CheckbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckbooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
