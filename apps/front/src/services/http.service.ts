import { injectable } from 'inversify';
import axios from 'axios';
import { backUrl } from '../../conf';

@injectable()
export class HttpService {
  config() {
    return { withCredentials: true, credentials: 'include' };
  }

  async get(url: string) {
    return (await axios.get(backUrl + `/api/${url}`, this.config())).data;
  }

  async post(url: string, data: any) {
    return (await axios.post(backUrl + `/api/${url}`, data, this.config()))
      .data;
  }
}
