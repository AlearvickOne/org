import { injectable } from 'inversify';
import axios from 'axios';
import { backUrl } from '../../conf';

@injectable()
export class HttpService {
  private _token = '';

  set token(v: string) {
    this._token = v;
  }

  config() {
    return {
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    };
  }

  async get(url: string) {
    return (await axios.get(backUrl + `/api/${url}`, this.config())).data;
  }

  async post(url: string, data: any) {
    return (await axios.post(backUrl + `/api/${url}`, data, this.config()))
      .data;
  }
}
