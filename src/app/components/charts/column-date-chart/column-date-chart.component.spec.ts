import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnDateChartComponent } from './column-date-chart.component';

describe('ColumnDateChartComponent', () => {
  let component: ColumnDateChartComponent;
  let fixture: ComponentFixture<ColumnDateChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnDateChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnDateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
