import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormsModule, Validators } from '@angular/forms';

import { HeroFormComponent } from './hero-form.component';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroFormComponent ],
      imports: [ MatDialogModule,
                  FormsModule ], 
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {id : 1,name:  "SPIDERMAN", city: "NEW YORK" }
     } ] }) 
    .compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form valid',() =>{
    component.heroForm.get('name')?.setValue('SPIDERMAN');
    component.heroForm.get('city')?.setValue('NEW YORK');

    const valid = component.heroForm.valid;

    expect(valid).toBeTrue();
  })

  it('Fill form',() =>{
    component.mapData();

    const form = new FormBuilder().group({
      name : new FormControl('',{validators:[Validators.min(0), Validators.required]}),
      city : new FormControl('',{validators: [Validators.min(0),Validators.required]})
               });

    expect(component.heroForm).toEqual(form);
  })


});
