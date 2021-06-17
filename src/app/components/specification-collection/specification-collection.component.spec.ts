import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationCollectionComponent } from './specification-collection.component';

describe('SpecificationCollectionComponent', () => {
  let component: SpecificationCollectionComponent;
  let fixture: ComponentFixture<SpecificationCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificationCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
