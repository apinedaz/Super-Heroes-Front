import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../Model/Hero';
import { ResponseApi } from '../Model/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private url = 'http://localhost:3000/heroes';

  constructor(private http: HttpClient) {
   }

}
