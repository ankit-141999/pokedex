import { Component } from '@angular/core';
import { GetCardsService } from '../get-cards.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  pokemons: any[] = [];

  constructor(private pokemonService: GetCardsService,private router: Router) {}

  goToDetail(pokemonName: string) {
    this.router.navigate(['/pokemon/', pokemonName]);
  }

  count = 0

  loadMore(){
    this.pokemons = []
    this.count = this.count + 10;
    this.pokemonService.getPokemonList(this.count).subscribe((data: any) => {
      const results = data.results;
      results.forEach((pokemon: any) => {
        this.pokemonService.getPokemonDetails(pokemon.url).subscribe((detail: any) => {
          this.pokemons.push({
            name: detail.name,
            height: detail.height,
            weight: detail.weight,
            type: detail.types[0].type.name,
            attack: detail.stats[1].base_stat,
            image: detail.sprites.front_default,
          });
        });
      });
    });
  }

  ngOnInit() {
    this.loadMore()
  }
}
