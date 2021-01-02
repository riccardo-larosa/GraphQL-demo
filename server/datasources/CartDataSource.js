import { RESTDataSource } from "apollo-datasource-rest";
import { responsePathAsArray } from "graphql";

export class CartDataSource extends RESTDataSource {
  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
    request.headers.set('Content-Type', 'application/json');
  }

  constructor() {
    super();
    this.baseURL = 'https://api.moltin.com/v2/';
  }

  async getCart(id) {
    var apiStr = `carts/${id}/`;
    const { data: result } = await this.get(apiStr);
    //console.log(result);
    return result;
  }

  async getCartItems(id) {
    var apiStr = `carts/${id}/items/`;
    const { data: result } = await this.get(apiStr);
    return result;
  }

  async updateCartItem(cartId, itemId, qty) {
    var apiStr = `carts/${cartId}/items/${itemId}`;
    var body = `{
      "data": {
      "type": "cart_item",
      "id": "${itemId}",
      "quantity": ${qty}
      }
    }`;
    const {data: result} = await this.put(apiStr, body);
    //console.log(result);
    return result[0]; //I have to do this because there is a "["
  }

}