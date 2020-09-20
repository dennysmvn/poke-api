/* eslint-disable @typescript-eslint/no-explicit-any */
import { check, ValidationChain } from 'express-validator';
import { isEmpty } from 'lodash';
import logger from '../logger';

class CommonValidation {
  private static extractItemFromKeyValueObject(value: any, keyName: string): any[] {
    try {
      return value
        .filter((item) => item.key === keyName)
        .map((item) => item.value) as any[];
    } catch (e) {
      logger.error('Failed to extract item from key value object', [
        { key: 'error', value: e },
        { key: 'value', value },
      ]);

      return [];
    }
  }

  static atLeast(attributeName: string, digits: number): ValidationChain {
    return check(attributeName)
      .isLength({ min: digits })
      .withMessage(`must be at least ${digits} characteres`);
  }

  static exactlyLength(attributeName: string, digits: number): ValidationChain {
    return check(attributeName)
      .isLength({ min: digits, max: digits })
      .withMessage(`must be at exactly ${digits} characteres`);
  }

  static equalOrGreatherThan(attributeName: string, target: number): ValidationChain {
    return check(attributeName).custom((value) => {
      if (value >= target) return true;
      throw new Error(`attribute must be equal or greather than ${target}.`);
    });
  }

  static greatherThan(attributeName: string, target: number): ValidationChain {
    return check(attributeName).custom((value) => {
      if (value > target) return true;
      throw new Error(`attribute must be greather than ${target}.`);
    });
  }

  static keyValueAllowedValues(attributeName: string, keyName: string, expectedValues: string[]): ValidationChain {
    return check(attributeName).custom((value) => {
      if (value === undefined) throw new Error(`attribute with key name ${keyName} was not found`);

      const retrieved = this.extractItemFromKeyValueObject(value, keyName);
      if (retrieved.length > 0 && expectedValues.includes(retrieved[0])) return true;

      const joinedExpectedValues = expectedValues.join(', ');
      throw new Error(`attribute has an invalid state. key: ${keyName}, expected values: ${joinedExpectedValues}.`);
    });
  }

  static keyValueNotEmpty(attributeName: string, keyName: string): ValidationChain {
    return check(attributeName).custom((value) => {
      if (value === undefined) throw new Error(`attribute with key name ${keyName} was not found.`);

      const retrieved = this.extractItemFromKeyValueObject(value, keyName);
      if (retrieved.length > 0 && !isEmpty(retrieved[0])) return true;

      throw new Error(`attribute with key name ${keyName} must be informed`);
    });
  }

  static notEmptyBy(attributeName: string): ValidationChain {
    return check(attributeName)
      .not()
      .isEmpty()
      .withMessage('must be informed');
  }

  static notEmpty(attributeNames: string[]): ValidationChain[] {
    return attributeNames.map((attribute): ValidationChain => CommonValidation.notEmptyBy(attribute));
  }

  static isInEnum<T>(attributeName: string, type: T): ValidationChain {
    return check(attributeName).custom((value) => {
      if (Object.values(type).includes(value)) return true;
      throw new Error(`attribute is not valid. allowed values: ${Object.values(type)}.`);
    });
  }

  static isInEnumOrUndefined<T>(attributeName: string, type: T): ValidationChain {
    return check(attributeName).custom((value) => {
      if (value === undefined) return true;
      if (Object.values(type).includes(value)) return true;
      throw new Error(`attribute is not valid. allowed values: ${Object.values(type)}.`);
    });
  }

  static isValidEmail(attributeName: string): ValidationChain {
    return check(attributeName)
      .isEmail()
      .withMessage('invalid e-mail');
  }

  static isValidZipCode(attributeName: string): ValidationChain {
    return check(attributeName).custom((value) => {
      if (value === undefined || typeof value !== 'string') {
        throw new Error('invalid value for provided country');
      }

      const sanitized = value.replace('-', '');
      if (Number.isNaN(+sanitized)) {
        throw new Error('invalid value for provided country');
      }

      if (sanitized.length !== 8) {
        throw new Error('invalid value lenth for provided country. expected 8 characters');
      }

      return true;
    });
  }

  static isValidMobilePhone(attributeName: string): ValidationChain {
    // issue opened: https://github.com/express-validator/express-validator/issues/772
    return check(attributeName)
      .isMobilePhone('any')
      .withMessage('invalid mobile phone');
  }

  static isValidCountry(attributeName: string): ValidationChain {
    return check(attributeName)
      .isISO31661Alpha3()
      .withMessage('invalid country type according to iso 31661 alpha 2');
  }
}

export default CommonValidation;
