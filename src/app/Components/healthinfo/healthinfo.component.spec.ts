import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthinfoComponent } from './healthinfo.component';

describe('HealthinfoComponent', () => {
  let component: HealthinfoComponent;
  let fixture: ComponentFixture<HealthinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
