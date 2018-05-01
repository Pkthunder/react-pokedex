import React, { Component } from 'react';
import { PokedexApi } from '../services/pokedex-api';

class Pokemon extends Component {
    constructor (props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            pokemon: null
        };

        this.api = new PokedexApi();
    }

    componentDidMount() {
        this.api.getPokemon(1)
        .then((result) => {
            console.log(result);

            this.setState({
                isLoaded: true,
                pokemon: result
            });
        }, (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        })
    }


    render() {
        const { error, isLoaded, pokemon } = this.state;
        const getSpriteUri = function (pokemon) {
            const baseUri = 'https://img.pokemondb.net/artwork/:name:.jpg';
            return baseUri.replace(':name:', pokemon.name.toLowerCase());
        };

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else {
            return (
                <ul>
                    <li>{pokemon.id}</li>
                    <li>{pokemon.name}</li>
                    <li>{pokemon.pokeIndex}</li>
                    <li><img src={getSpriteUri(pokemon)} alt={getSpriteUri(pokemon)}/></li>
                </ul>
            );
        }
    }
}

export default Pokemon;
