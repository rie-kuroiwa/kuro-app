import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingCollectionComponent } from './purchasing-collection.component';

describe('PurchasingCollectionComponent', () => {
  let component: PurchasingCollectionComponent;
  let fixture: ComponentFixture<PurchasingCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasingCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasingCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
