import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarScriptDialogComponent } from './agregar-script-dialog.component';

describe('AgregarScriptDialogComponent', () => {
  let component: AgregarScriptDialogComponent;
  let fixture: ComponentFixture<AgregarScriptDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarScriptDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarScriptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
