import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Joke } from './joke';

const httpOptions = {
  headers: new HttpHeaders({ 'Accept': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class JokeService {
  joke: Joke;
  ratedJokes: any;
  constructor(private http: HttpClient) { }
  // getJoke(): any {
  //   return this.http.get<Joke>('https://icanhazdadjoke.com/', httpOptions);
  // }
  getJoke(): Observable<any> {
    return this.http.get<Joke>('https://icanhazdadjoke.com/', httpOptions)
      .pipe(
        tap(heroes => this.log(`fetched Joke`)),
        catchError(this.handleError('getJoke', []))
      );
  }
  rateJoke(currentJoke, rating): any {
    const { id, joke } = currentJoke;
    this.ratedJokes = {
      ...this.ratedJokes,
      [id]: {
        id,
        joke,
        rating
      }
    };
  }
  getRatedJokes(): string[] {
    if (!this.ratedJokes) {
      return [];
    }
    return Object.keys(this.ratedJokes).map((key) => this.ratedJokes[key]);
  }

  getSelectedJoke(id): any {
    console.log(this.ratedJokes);
    if (!this.ratedJokes) {
      return {};
    }
    return this.ratedJokes[id];
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('JokeService: ' + message);
  }
}
