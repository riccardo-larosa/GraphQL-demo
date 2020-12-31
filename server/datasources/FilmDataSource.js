import { RESTDataSource } from "apollo-datasource-rest";

export class FilmDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
  }

  // async getFilm(id) {
  //   console.log(`film: ${id}`);
  //   var apiStr = `films/${id}/`;
  //   const result = await this.get(apiStr);
  //   return result;
  // }

  async getFilmByUrl(url) {
    this.baseURL = '';
    const result = await this.get(url);
    return result;
  }
  
}