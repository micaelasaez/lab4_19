import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Clase2Component } from './clase2.component';

describe('Clase2Component', () => {
  let component: Clase2Component;
  let fixture: ComponentFixture<Clase2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Clase2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Clase2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
