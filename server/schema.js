import {gql} from "apollo-server";

export const typeDefs = gql`
  type Person {
    gender: String
    email: String
    phone: String
    city: String
  }

  type Film {
    title: String
    director: String
    opening_crawl: String
    producer: String
    release_date: String
  }

  type Planet {
    name: String
    rotation_period: String
    orbital_period: String
    diameter: String
    climate: String 
    gravity: String 
  }
  type SWPerson {
    name: String 
    height: String
    birth_year: String  
    gender: String
    films: [Film]
    homeworld: Planet
  }

  type Car {
    id: Int!
    plateNumber: String!
    color: String!
    model: String!
  }

  type Brand {
    id: ID!
    type: String!
    name: String!
    slug: String!
  }

  type Mutation {
    createSomething(title:String): String #TBD
  }

  type Query {
    hello(name: String): String!
    randomPerson: [Person!]!        # https://api.randomuser.me/
    people(id: Int!): SWPerson      # https://swapi.dev/api/people/
    car(plateNumber: String!): Car  # https://mvrp.herokuapp.com/api/
    cars: [Car]                     # https://mvrp.herokuapp.com/api/
    brands: [Brand]                 # https://api.moltin.com/v2/brands 
  }

`;

