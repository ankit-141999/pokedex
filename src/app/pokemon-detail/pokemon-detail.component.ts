import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetCardsService } from '../get-cards.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent {
  pokemon: any;

  constructor(private route: ActivatedRoute, private pokemonService: GetCardsService) { }

    ngOnInit() {
      const pokemonName: string | null = this.route.snapshot.paramMap.get('pokemonName');
      this.pokemonService.getPokemon(pokemonName).subscribe((data: any) => {
        this.pokemonService.getPokemonDescription(pokemonName).subscribe((speciesData: any) => {
          const descriptionEntry = speciesData.flavor_text_entries.find(
            (entry: any) => entry.language.name === 'en'
          );
          this.pokemon = {
            name: data.name,
            image: data.sprites.front_default,
            description: descriptionEntry ? descriptionEntry.flavor_text : 'No description available',
            type: data.types.map((t: any) => t.type.name).join('/'),
            height: data.height,
            weight: data.weight,
            attackPower: data.stats.find((s: any) => s.stat.name === 'attack').base_stat,
            baseStat: data.stats.map((s: any) => ({ name: s.stat.name, value: s.base_stat })),
            attacks: data.moves.slice(0, 5).map((m: any) => m.move.name)
          };
        });
      });
    }
}
