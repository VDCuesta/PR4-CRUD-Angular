import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionComponent } from './actualizacion.component';

describe('ActualizacionComponent', () => {
  let component: ActualizacionComponent;
  let fixture: ComponentFixture<ActualizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
