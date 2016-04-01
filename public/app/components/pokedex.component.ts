import { Component } from 'angular2/core'
import { HTTP_PROVIDERS } from 'angular2/http'
import { ROUTER_DIRECTIVES } from 'angular2/router'
import { ImageifyPipe } from '../pipes/imageify.pipe'
import { PokemonService } from '../services/pokemon.service'
import { PokemonNameComponent } from './pokemon-name.component'
import { PokemonImageComponent } from './pokemon-image.component'
import { PokemonTypeComponent } from './pokemon-type.component'

@Component({
	selector: 'pokedex',
	pipes: [ImageifyPipe],
	directives: [PokemonNameComponent, PokemonImageComponent, PokemonTypeComponent, ROUTER_DIRECTIVES],
	providers: [PokemonService, HTTP_PROVIDERS],
	template: `
		<div>
  			<div class="page-header">
    		<h1>Pokédex</h1>
  			</div>
			<div class="pokemon" *ngFor="#pokemon of pokemons">
				<a [routerLink]="['Pokemon', { name: pokemon.name }]">
					<pokemon-name [pokemon]="pokemon" ></pokemon-name>
					<pokemon-image [pokemon]="pokemon" ></pokemon-image>
					<div class="text-center">
				      <pokemon-type [pokemon]="pokemon"></pokemon-type>
				    </div>
				</a>
			</div>
		</div>
	`
})

export class PokedexComponent {
	pokemons = []
	
	constructor (private _pokemonService: PokemonService) {
		this._pokemonService.getPokemons()
			.subscribe(pokemons => this.pokemons = pokemons)
		
	}
	
}