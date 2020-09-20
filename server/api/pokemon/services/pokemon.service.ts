import _ from 'lodash';
import { PokemonRequest } from '../models/pokemon.request.model';
import { PokemonResponse } from '../models/pokemon.response.model';
import ServiceResult from '../../../common/models/service.result.models';
import PokemonData from '../models/pokemon.database.model';
import mongoose from 'mongoose';

export default class PokemonService {
  static async create(pokemonRequest: PokemonRequest): Promise<ServiceResult<PokemonResponse>> {
    const serviceResult = new ServiceResult<PokemonResponse>();
    //Call PokeAPI adapter to retrieve pokemon name

    const pokemonData = new PokemonData({
      nickname: 'Dino',
      name: 'Bulbassauro',
    });
    await pokemonData.save();

    serviceResult.result = {
      nickname: 'Dino',
      name: 'Bulbassauro',
    };
    return Promise.resolve(serviceResult);
  }
}