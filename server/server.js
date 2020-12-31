import { ApolloServer } from "apollo-server";
import { PeopleDataSource } from "./datasources/PeopleDataSource.js";
import { RandomUserDataSource } from "./datasources/RandomUserDataSource.js";
import { VehicleDataSource } from "./datasources/VehicleDataSource.js";
import { BrandDataSource } from "./datasources/BrandDataSource.js";
import { typeDefs } from "./schema.js";
import { FilmDataSource } from "./datasources/FilmDataSource.js";
import { PlanetDataSource } from "./datasources/PlanetDataSource.js";



const dataSources = () => ({
  peopleAPI: new PeopleDataSource(),
  randomUserAPI: new RandomUserDataSource(),
  vehicleAPI: new VehicleDataSource(),
  brandAPI: new BrandDataSource(),
  filmAPI: new FilmDataSource(),
  planetAPI: new PlanetDataSource(),
});

const resolvers = {
  SWPerson: {
    films: ( parent, __, {dataSources}) => { 
      const promises = parent.films.map(async url => {
        return dataSources.filmAPI.getFilmByUrl(url);
      });
      return Promise.all(promises);
    }, 
    homeworld: (parent, __, {dataSources}) => dataSources.planetAPI.getPlanetByUrl(parent.homeworld)
  },
  Query: {
    hello: (_, {name}) => `Hello ${name}`,
    randomPerson: (_root, _args, { dataSources } ) => dataSources.randomUserAPI.getPerson(), 
    people: (_root, { id }, { dataSources })     => dataSources.peopleAPI.getPeople(id),
    car: (_root, {plateNumber}, { dataSources }) => dataSources.vehicleAPI.getCar(plateNumber),
    cars: (_, __, {dataSources }) => dataSources.vehicleAPI.getCars(), 
    brands: (_, __, { dataSources }) =>    dataSources.brandAPI.getBrands(),
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



