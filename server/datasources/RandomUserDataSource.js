import { RESTDataSource } from "apollo-datasource-rest";

export class RandomUserDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.randomuser.me/";
  }

  async getPerson() {
    //const {results} = await this.get("");
    const {results} = await this.get("", null, { cacheOptions: {ttl:5}});
    console.log(results);
    return results;
  }
}
