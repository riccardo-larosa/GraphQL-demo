import { RESTDataSource } from "apollo-datasource-rest";

export class VehicleDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://mvrp.herokuapp.com/api/';
  }

  async getCar(plateNumber) {
    const result = await this.get("car", {plateNumber});
    //const {results} = await this.get("", null, { cacheOptions: {ttl:5}});
    return result;
  }

  async getCars() {
    const result = await this.get("cars");
    return result;
  }
  
}