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

  async put(url: string, data: any) {
    return (await axios.put(backUrl + `/api/${url}`, data, this.config())).data;
  }

  async delete(url: string) {
    return (await axios.delete(backUrl + `/api/${url}`, this.config())).data;
  }

  async postFormData(url: string, formData: FormData) {
    return (
      await axios.post(backUrl + `/api/${url}`, formData, {
        ...this.config(),
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ).data;
  }
}
