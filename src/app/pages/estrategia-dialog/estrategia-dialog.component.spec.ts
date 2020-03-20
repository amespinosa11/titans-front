import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstrategiaDialogComponent } from './estrategia-dialog.component';

describe('EstrategiaDialogComponent', () => {
  let component: EstrategiaDialogComponent;
  let fixture: ComponentFixture<EstrategiaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstrategiaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstrategiaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
