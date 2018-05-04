import { Ajax } from './ajax';

export class PokedexApi extends Ajax {
  constructor () {
    super();

    this.baseUri = 'http://localhost:5200/api/v1';
  }


  getPokemon (id) {
    console.log(`${this._baseUri}/pokemon/p/${id}`);
    return this.get(`/pokemon/p/${id}`);
  }
}
