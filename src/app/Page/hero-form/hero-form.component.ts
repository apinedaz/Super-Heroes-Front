import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hero } from 'src/app/Model/Hero';
import { HeroService } from 'src/app/Service/hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {

  public heroForm: FormGroup;

  constructor(private fb: FormBuilder,
              private heroService: HeroService,
              private router: Router){
    this.heroForm = this.fb.group({
      name : new FormControl(null,{validators:[Validators.required]}),
      city : new FormControl(null,{validators:[Validators.required]}),
      superpower : new FormControl(''),
      realName : new FormControl(null,{validators:[Validators.required]})
  });
  }

  ngOnInit(): void {

  }

  public create(){
    const hero = this.heroForm.value as Hero;
    this.heroService.create(hero).subscribe();
    this.router.navigate(['home']);
  }

}
