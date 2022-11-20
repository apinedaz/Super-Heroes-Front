import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { Hero } from 'src/app/Model/Hero';
import { ResponseApi } from '../Model/ResponseApi';
import { of } from 'rxjs';

describe('HeroService', () => {
  let service: HeroService;
  let httpClientSpy: {post: jasmine.Spy, get: jasmine.Spy, put: jasmine.Spy}

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // service = TestBed.inject(HeroService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post','put']);
    service = new HeroService(<any> httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('return all heroes', (done: DoneFn) => {

    const heroesList: Hero[] = [
      {id: 1, name: 'SPIDERMAN',city: 'NEW YORK', realName: 'PETER PARKER'},
      {id: 2, name: 'SUPERMAN',city: 'NEW YORK', realName: 'CLARK KENT'}
    ];
    const response : ResponseApi = {data: heroesList, success: true , message: ''};
    httpClientSpy.get.and.returnValue(of(response));
  
    service.getAll().suscribe((result : ResponseApi) =>{
      expect(result).toEqual(response);
      done();
    });

  });

  it('not found heroes',(done: DoneFn) =>{

    const response : ResponseApi = {data: null, success: false , message: 'Not found Heroes',error: '404 NOT FOUND'};
    httpClientSpy.get.and.returnValue(of(response));
  
    service.getAll().suscribe((result : ResponseApi) =>{
      expect(result).toEqual(response);
      done();
    });

  });

  it('Return hero with id = 1', (done: DoneFn) =>{

    const heroExpected: Hero = {id: 1, name: 'SPIDERMAN',city: 'NEW YORK', realName: 'PETER PARKER'};
    const response: ResponseApi = {data: heroExpected, success: true, message: ''}; 
    httpClientSpy.get.and.returnValue(of(response));

    service.getById(1).suscribe((result: ResponseApi) =>{
      expect(result).toEqual(response);
      done();
    });

  });

  it('not found heroes',(done: DoneFn) =>{
    const response : ResponseApi = {data: null, success: false , message: 'Not found Heroe with id = 1',error: '404 NOT FOUND'};
    httpClientSpy.get.and.returnValue(of(response));
  
    service.getById(1).suscribe((result : ResponseApi) =>{
      expect(result).toEqual(response);
      done();
    });

  });


  it('Create hero',(done: DoneFn) =>{
    const hero: Hero = {id: 1, name: 'SPIDERMAN',city: 'NEW YORK', realName: 'PETER PARKER'};
    const response: ResponseApi = {success: true, message: 'Created'};
    httpClientSpy.post.and.returnValue(of(response));

    service.create(hero).suscribe((result : ResponseApi) =>{
      expect(result).toEqual(response);
      done();
    });
  });

  it('Update hero', (done: DoneFn) =>{
    const update: Hero = {id: 1, name: 'SPIDERMAN',city : 'MANHATTAN', realName: 'PETER PARKER'};

    const response: ResponseApi = {success: true, message: 'Updated'};
    httpClientSpy.put.and.returnValue(of(response));

    service.update(update).suscribe((result : ResponseApi) =>{
      expect(result).toEqual(response);
      done();
    });
  });

  it('Delete hero',(done: DoneFn) =>{
    
    const response: ResponseApi = {success: true, message: 'Deleted'};

    httpClientSpy.post.and.returnValue(of(response));

    service.delete(1).suscribe((result : ResponseApi) =>{
      expect(result).toEqual(response);
      done();
    });
  })

  it('Find all heroes with cotains a specific string',(done: DoneFn) =>{

    const heroes: Hero[] =[];

    const response: ResponseApi = {success: true, data: heroes};

    httpClientSpy.get.and.returnValue(of(response));

    service.findWithString('').suscribe((result : ResponseApi) =>{
      expect(result).toEqual(response);
      done();
    });
  });

  it('not found heroes with contains a specific string ',(done: DoneFn) =>{

    const response : ResponseApi = {data: null, success: false , message: 'Not found Heroes',error: '404 NOT FOUND'};
    httpClientSpy.get.and.returnValue(of(response));
  
    service.findWithString().suscribe((result : ResponseApi) =>{
      expect(result).toEqual(response);
      done();
    });

  });
});
