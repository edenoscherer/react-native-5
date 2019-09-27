import axios, {AxiosInstance, AxiosResponse} from 'axios';

/// <reference path="axios" />
/**
 * @export
 * @class CodenationApi
 *
 * @property {string} TOKEN
 * @property {string} API_URL
 */
export class CodenationApi {
  constructor() {
    this.TOKEN = null;
    this.API_URL = 'https://api.codenation.dev/v1';
  }

  /**
   * @author Edeno Luiz Scherer
   * @date 2019-09-16
   * @private
   * @returns {AxiosInstance}
   */
  getAxios() {
    return axios.create({
      baseURL: this.API_URL,
      // timeout: 1000,
      headers: {
        'X-Auth-Token': this.TOKEN,
        'Content-Type': 'application/json',
      },
    });
  }
}
