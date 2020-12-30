import { ApolloServer } from "apollo-server";
import { PeopleDataSource } from "./datasources/PeopleDataSource.js";
import { RandomUserDataSource } from "./datasources/RandomUserDataSource.js";
import { VehicleDataSource } from "./datasources/VehicleDataSource.js";
import { BrandDataSource } from "./datasources/BrandDataSource.js";
import { typeDefs } from "./schema.js";



const dataSources = () => ({
  peopleAPI: new PeopleDataSource(),
  randomUserAPI: new RandomUserDataSource(),
  vehicleAPI: new VehicleDataSource(),
  brandAPI: new BrandDataSource(),
});

const resolvers = {
  Query: {
    hello: (_, {name}) => `Hello ${name}`,
    randomPerson: (_root, _args, { dataSources } ) => dataSources.randomUserAPI.getPerson(), 
    people: (_root, { id }, { dataSources })     => dataSources.peopleAPI.getPeople(id),
    car: (_root, {plateNumber}, { dataSources }) => dataSources.vehicleAPI.getCar(plateNumber),
    cars: (_, __, {dataSources }) => dataSources.vehicleAPI.getCars(), 
    brands: (_, __, { req, dataSources }) =>    dataSources.brandAPI.getBrands(),
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



