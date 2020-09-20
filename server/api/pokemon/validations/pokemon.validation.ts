import { ValidationChain, check as checkValidator } from 'express-validator';
import check from '../../../common/validation/common.validation';

class PokemonValidation {
  static rules(): ValidationChain[] {
    return check
      .notEmpty([
        'nickname',
        'number',
      ])
      .concat([
        check.greatherThan('number', 0),
      ]);
  }
}

export default PokemonValidation;