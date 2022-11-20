import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { Hero } from 'src/app/Model/Hero';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('HeroService', () => {
  let service: HeroService;
  let httpClientSpy: {post: jasmine.Spy, get: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy}

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // service = TestBed.inject(HeroService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post','put','delete']);
    service = new HeroService(<any> httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('return all heroes', (done: DoneFn) => {

    const heroesList: Hero[] = [
      {id: 1, name: 'SPIDERMAN',city: 'NEW YORK'},
      {id: 2, name: 'SUPERMAN',city: 'NEW YORK'}
    ];

    httpClientSpy.get.and.returnValue(of(heroesList));
  
    service.getAll().subscribe((result : Hero[]) =>{
      expect(result).toEqual(heroesList);
      done();
    });

  });

  it('not found heroes',(done: DoneFn) =>{

    const error404 =new HttpErrorResponse({
      status: 404,
      statusText: "Not Found"
    });

    httpClientSpy.get.and.returnValue(throwError(error404));
  
    service.getById(1).subscribe((result : Hero) =>{
      
    },
    (error: any) =>{
      expect(error.status).toEqual(404);
      done();
    });

  });

  it('Return hero with id = 1', (done: DoneFn) =>{

    const heroExpected: Hero = {id: 1, name: 'SPIDERMAN',city: 'NEW YORK'};
    httpClientSpy.get.and.returnValue(of(heroExpected));

    service.getById(1).subscribe((result: Hero) =>{
      expect(result).toEqual(heroExpected);
      done();
    });

  });

  it('Create hero',(done: DoneFn) =>{

    const heroSend: Hero = {name: 'SPIDERMAN',city: 'NEW YORK'};

    const hero: Hero = {id: 1, name: 'SPIDERMAN',city: 'NEW YORK'};

    httpClientSpy.post.and.returnValue(of(hero));

    service.create(heroSend).subscribe((result : Hero) =>{
      expect(result).toEqual(hero);
      done();
    });
  });


  it('Update hero', (done: DoneFn) =>{
    const update: Hero = {id: 1, name: 'SPIDERMAN',city : 'MANHATTAN'};

    httpClientSpy.put.and.returnValue(of(update));

    service.update(update).subscribe((result : Hero) =>{
      expect(result).toEqual(update);
      done();
    });
  });

  it('Delete hero',(done: DoneFn) =>{

    httpClientSpy.delete.and.returnValue(of([]));

    service.delete(1).subscribe((result : any) =>{
      expect(result).toEqual([]);
      done();
    });
  })

  it('Find all heroes with name cotains a specific string',(done: DoneFn) =>{

    const heroes: Hero[] =[{
      "id": 1,
      "name": "SPIDERMAN",
      "city": "NEW YORK"
    },
    {
      "id": 2,
      "name": "SUPERMAN",
      "city": "NEW YORK"
    }];

    httpClientSpy.get.and.returnValue(of(heroes));

    service.findWithString('MAN').subscribe((result : Hero[]) =>{
      expect(result).toEqual(heroes);
      done();
    });
  });

  it('not found heroes with contains a specific string ',(done: DoneFn) =>{

    httpClientSpy.get.and.returnValue(of(null));
  
    service.findWithString('MAN').subscribe((result : Hero[]) =>{
      expect(result).toBeNull();
      done();
    });

  });
});
