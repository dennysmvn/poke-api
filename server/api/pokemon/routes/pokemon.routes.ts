/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express';
import PokemonController from '../controllers/pokemon.controller'
import ValidationRequest from '../../middlewares/validate.handler';
import PokemonValidation from '../validations/pokemon.validation';

const routes = Router();

routes.post('/', PokemonValidation.rules(), ValidationRequest, PokemonController.create);

export default routes;