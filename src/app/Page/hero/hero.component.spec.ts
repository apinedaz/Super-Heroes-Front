import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { Hero } from 'src/app/Model/Hero';
import { HeroService } from 'src/app/Service/hero.service';

import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let service: HeroService;
  let httpClientSpy: {get: jasmine.Spy}

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new HeroService(<any> httpClientSpy);
    await TestBed.configureTestingModule({
      declarations: [ HeroComponent ],
      imports: [ FormsModule ],
      providers: [ { provide: HeroService, useValue: service}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
