/* eslint-disable @typescript-eslint/no-explicit-any */
import { filter } from 'lodash';

class CommonValidation {
  static findErrorByMessage(errors: Array<any>, attributeName: string, msg: string): string | null {
    const entries = filter(errors, { param: attributeName, msg }).map((i) => i.param);
    const [head] = entries;
    return head || null;
  }

  static findErrorsByMessage(errors: Array<any>, attributeNames: string[], msg: string): any[] {
    return attributeNames.map((a) => this.findErrorByMessage(errors, a, msg));
  }
}

export default CommonValidation;
