import { RESTDataSource } from "apollo-datasource-rest";

export class PlanetDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
    this.initialize({}); // this is needed because it's not initialized in the DataSources when Apollo starts
  }

  async getPlanetByUrl(url) {
    this.baseURL = '';
    const result = await this.get(url);
    return result;
  }
  
}