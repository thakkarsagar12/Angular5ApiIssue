import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Country} from '../country/country';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {MessageService} from './message.service';
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUyMDE0NDEzNX0.1hhpYlfkcdbadsMJR4Lz2xE_NqnpMzzd3PsLcZhJtIoeTqGGiMZk6g-dhILuxQlRk4GV06NeirEfat4Yh48FgA' }
      )
};

@Injectable()
export class AuthService implements OnInit {

  private Url = 'localhost:8081/api/country-masters';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  ngOnInit(): void {
    console.log(httpOptions);
  }

  getCountry(): Observable<Country[]> {
    return this.http.get<Country[]>(this.Url, httpOptions)
      .pipe(
        tap(countries => console.log(httpOptions)),
        catchError(this.handleError('getCountries', []))
      );
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
    this.messageService.add('HeroService: ' + message);
  }

}
