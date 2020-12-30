import { RESTDataSource } from "apollo-datasource-rest";

export class PeopleDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
  }

  async getPeople(id) {
    var apiStr = `people/${id}/`;
    const result = await this.get(apiStr);
    return result;
  }
  
}