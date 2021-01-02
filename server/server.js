import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema.js";
import { BrandDataSource } from "./datasources/BrandDataSource.js";
import { FilmDataSource } from "./datasources/FilmDataSource.js";
import { PeopleDataSource } from "./datasources/PeopleDataSource.js";
import { PlanetDataSource } from "./datasources/PlanetDataSource.js";
import { RandomUserDataSource } from "./datasources/RandomUserDataSource.js";
import { VehicleDataSource } from "./datasources/VehicleDataSource.js";
import { CartDataSource } from "./datasources/CartDataSource.js";


// using RESTDataSource from Apollo
const dataSources = () => ({
  peopleAPI: new PeopleDataSource(),
  randomUserAPI: new RandomUserDataSource(),
  vehicleAPI: new VehicleDataSource(),
  brandAPI: new BrandDataSource(),
  filmAPI: new FilmDataSource(),
  planetAPI: new PlanetDataSource(),
  cartAPI: new CartDataSource(),
});

//this is a mish-mash of resolvers to show that you can query different things in GraphQL
const resolvers = {
  CartItem: {
    unitPrice: (parent) => parent.unit_price,
  },
  Cart: {
    priceWithTax: (parent) => parent.meta.display_price.with_tax,
    priceWithoutTax: (parent) => parent.meta.display_price.without_tax,
    tax: (parent) => parent.meta.display_price.tax,
    cartItems: (parent, __, { dataSources }) => dataSources.cartAPI.getCartItems(parent.id), 
  },
  SWPerson: {
    films: ( parent, __, {dataSources}) => parent.films.map( url => dataSources.filmAPI.getFilmByUrl(url) ), 
    homeworld: (parent, __, {dataSources}) => dataSources.planetAPI.getPlanetByUrl(parent.homeworld),
  },
  Query: {
    hello: (_, {name}) => `Hello ${name}`,
    randomPerson: (_root, _args, { dataSources } ) => dataSources.randomUserAPI.getPerson(), 
    people: (_root, { id }, { dataSources })     => dataSources.peopleAPI.getPeople(id),
    car: (_root, {plateNumber}, { dataSources }) => dataSources.vehicleAPI.getCar(plateNumber),
    cars: (_, __, {dataSources }) => dataSources.vehicleAPI.getCars(), 
    brands: (_, __, { dataSources }) =>    dataSources.brandAPI.getBrands(),
    cart: (_, { id }, { dataSources }) => dataSources.cartAPI.getCart(id),
  },
  Mutation: {
    updateCartItem: (_,  args , { dataSources }) => dataSources.cartAPI.updateCartItem(args.cartId, args.itemId, args.qty)
  }
};

// pass the Authorization header if present 
const context = async ({ req }) => ({
  token : req.headers.authorization
});

const server = new ApolloServer({
  typeDefs, 
  resolvers,
  dataSources,
  context
}); 


server.listen({port: 4001})
  .then((serverInfo) => console.log(`Server is running at ${serverInfo.url}`) );



