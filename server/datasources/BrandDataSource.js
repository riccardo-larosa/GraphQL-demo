import { RESTDataSource } from "apollo-datasource-rest";

export class BrandDataSource extends RESTDataSource {
  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }
  
  constructor() {
    super();
    this.baseURL = 'https://api.moltin.com/v2/';
  }

    async getBrands() {
    const { data: brands }  = await this.get("brands");
    console.log(brands)
    return brands;
  }
  
}