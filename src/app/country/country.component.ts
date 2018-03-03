import { Component, OnInit } from '@angular/core';
import {Country} from './country';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countries: Country[];

  constructor(private countryService: AuthService) { }

  ngOnInit() {
    this.getCountries();
  }

  private getCountries() {
    this.countryService.getCountry().subscribe(countries => this.countries = countries);
  }
}
