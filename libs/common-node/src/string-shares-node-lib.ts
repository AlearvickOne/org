import * as argon2 from 'argon2';
import { argon2id } from 'argon2';

export class StringSharesNodeLib {
  constructor() {}

  /** Кодирование - декодирование */

  static async toHashArgon2(str: string) {
    const hash = await argon2.hash(str, { type: argon2id });
    return await this.toEncodeBase64(hash);
  }

  static async verifyHashArgon2(hashStr: string, str: string) {
    const decodeHash = await StringSharesNodeLib.toDecodeBase64(hashStr);
    return await argon2.verify(decodeHash, str);
  }

  static async toEncodeBase64(data: string) {
    return Buffer.from(data).toString('base64');
  }

  static async toDecodeBase64(data: string) {
    return Buffer.from(data, 'base64').toString('utf-8');
  }

  /* */
}
