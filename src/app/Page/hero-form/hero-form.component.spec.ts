import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormsModule} from '@angular/forms';

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
        { provide: MAT_DIALOG_DATA, useValue: {id : 1,name:  "SPIDERMAN", city: "NEW YORK" } },
        { provide: FormBuilder}
      ] }) 
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
    const name = component.heroForm.get('name')?.value;
    const city = component.heroForm.get('city')?.value;
    expect(name).toEqual('SPIDERMAN');
    expect(city).toEqual('NEW YORK');
  })


});
