import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/app/Model/Hero';
import { HeroService } from 'src/app/Service/hero.service';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss']
})
export class HeroEditComponent implements OnInit{

  public heroForm : FormGroup;
  private id = 0;

  constructor(private route:ActivatedRoute,
              private fb: FormBuilder,
              private heroService: HeroService,
              private router: Router){
      this.heroForm = this.fb.group({
        name : new FormControl(null,{validators:[Validators.required]}),
        city : new FormControl(null,{validators:[Validators.required]}),
        superpower : new FormControl(''),
        realName : new FormControl(null,{validators:[Validators.required]}),
        id: new FormControl(0)
    });
    const params = this.route.params.subscribe( params =>{
      this.id = params['id'];
    });

  }

  ngOnInit(): void {
    this.getData();
  }

  private getData(){
    this.heroService.getById(this.id).subscribe((response : Hero) =>{
      this.heroForm.get('name')?.setValue(response.name);
      this.heroForm.get('city')?.setValue(response.city);
      this.heroForm.get('superpower')?.setValue(response.superpower);
      this.heroForm.get('realName')?.setValue(response.realName);
      this.heroForm.get('id')?.setValue(response.id);
    });
  }

  public edit(){
    const hero = this.heroForm.value as Hero;
    this.heroService.update(hero).subscribe();
    this.router.navigate(['home']);
  }

}
