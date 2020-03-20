import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresoEstrategiaComponent } from './progreso-estrategia.component';

describe('ProgresoEstrategiaComponent', () => {
  let component: ProgresoEstrategiaComponent;
  let fixture: ComponentFixture<ProgresoEstrategiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgresoEstrategiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgresoEstrategiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
