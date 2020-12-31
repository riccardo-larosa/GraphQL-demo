import { RESTDataSource } from "apollo-datasource-rest";

export class PlanetDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
  }

  async getPlanetByUrl(url) {
    this.baseURL = '';
    const result = await this.get(url);
    return result;
  }
  
}