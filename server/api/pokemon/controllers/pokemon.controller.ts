import { Request, Response, NextFunction } from 'express';
import { OK } from 'http-status-codes';
import PokemonService from '../services/pokemon.service';
import Controller from '../../../common/controller';

class PokemonController {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const response = await PokemonService.create(req.body);
      return Controller.response(OK, res, response);
    } catch (error) {
      return next(error);
    }
  }
}

export default PokemonController;