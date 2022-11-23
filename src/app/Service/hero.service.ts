import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../Model/Hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private url = 'http://localhost:3000/heroes';

  constructor(private http: HttpClient) {
   }

   public create(hero: Hero):Observable<Hero>{
    return this.http.post<Hero>(this.url,hero);
   }

   public update(hero: Hero): Observable<Hero>{
    return this.http.put<Hero>(`${this.url}/${hero.id}`,hero);
   }

   public getAll():Observable<Hero[]>{
    return this.http.get<Hero[]>(this.url);
   }

   public getById(id: number):Observable<Hero>{
    return this.http.get<Hero>(`${this.url}/${id}`);
   }

   public delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
   }

   public findWithString(find: string):Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.url}?name_like=${find}`);
   }

}
