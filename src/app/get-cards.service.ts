import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetCardsService {
  private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number) {
    return this.http.get(`${this.baseUrl}pokemon?limit=${limit}`);
  }

  getPokemonDetails(url: string) {
    return this.http.get(url);
  }
  getPokemon(name: string|null) {
    return this.http.get(`${this.baseUrl}pokemon/${name}`);
  }

  getPokemonDescription(pokemonName: string|null) {
    return this.http.get(`${this.baseUrl}pokemon-species/${pokemonName}`);
  }

}
