import React, { Component } from 'react';
import { PokedexApi } from '../services/pokedex-api';
import './Pokemon.css';

class Pokemon extends Component {
    constructor (props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            pokeIndex: 1,
            pokemon: null
        };

        this.api = new PokedexApi();
    }

    getPokemon (index) {
        this.api.getPokemon(index)
        .then((result) => {
            console.log(result);

            this.setState({
                isLoaded: true,
                pokemon: result,
                pokeIndex: index
            });
        }, (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        })
    }

    prevPokemon () {
        return this.getPokemon(this.state.pokeIndex - 1);
    }

    nextPokemon () {
        return this.getPokemon(this.state.pokeIndex + 1);
    }

    componentDidMount() {
        return this.getPokemon(this.state.pokeIndex);
    }

    // atk	49
    // def	49
    // spa	65
    // spd	65
    // hp	45
    // speed	45


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
                <div className="Pokemon">
                    <div className="Pokemon-inner">
                        <div className="left-panel">a</div>
                        <div className="main-panel">
                            <div className="learnset-pane">
                                <h1 className="Pokemon-name">{pokemon.pokeIndex} - {pokemon.name}</h1>
                                <p className="type">
                                    {pokemon.type.map((type) => <span className={type.toLowerCase()}>{type}</span>)}
                                </p>
                            </div>
                            <div className="info-pane">
                                <img className="sprite" src={getSpriteUri(pokemon)} alt={getSpriteUri(pokemon)}/>
                                <h3>Base Stats</h3>
                                <div className="text-left stats-pane">
                                    <p>
                                        <span className="text-left font-bold">Attack:</span>
                                        <span className="pull-right">{pokemon.base.atk}</span>
                                    </p>
                                    <p>
                                        <span className="font-bold">Defense:</span>
                                        <span className="pull-right">{pokemon.base.def}</span>
                                    </p>
                                    <p>
                                        <span className="font-bold">Sp. Attack:</span>
                                        <span className="pull-right">{pokemon.base.spa}</span>
                                    </p>
                                    <p>
                                        <span className="font-bold">Sp. Defense:</span>
                                        <span className="pull-right">{pokemon.base.spd}</span>
                                    </p>
                                    <p>
                                        <span className="font-bold">HP:</span>
                                        <span className="pull-right">{pokemon.base.hp}</span>
                                    </p>
                                    <p>
                                        <span className="font-bold">Speed:</span>
                                        <span className="pull-right">{pokemon.base.speed}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="right-panel">a</div>
                    </div>
                </div>
            );
        }
    }
}

export default Pokemon;
