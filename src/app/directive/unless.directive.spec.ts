import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { UnlessDirective } from './unless.directive';
import { TestParentComponent } from '../pages/test-parent/test-parent.component';

let fixture: any;

beforeEach(() => {
  fixture = TestBed.configureTestingModule({
    declarations: [TestParentComponent, UnlessDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  }).createComponent(TestParentComponent);
  fixture.detectChanges();
});
it('a is false display element', () => {
  const unlessA: HTMLElement = fixture.nativeElement.querSelector('.unless');
  expect(unlessA).toBeTrue();
});

it('a is display none element', () => {
  const unlessB: HTMLElement =
    fixture.nativeElement.querSelector('.nonCondition');
  expect(unlessB).toBeFalsy();
});
