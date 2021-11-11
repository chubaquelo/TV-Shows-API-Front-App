import { AxiosInstance } from 'axios';
import axios from 'axios';

export class AxiosRepository {
  client(): AxiosInstance {
    return axios.create({
      baseURL: 'http://api.tvmaze.com/search/shows',
    });
  }
}
