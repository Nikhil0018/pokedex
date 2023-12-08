import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';

@Injectable()
export class BaseApiUrl {
	public static POKE_API = environment.pokeapi.base;
}
