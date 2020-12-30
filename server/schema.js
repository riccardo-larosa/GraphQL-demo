import {gql} from "apollo-server";

export const typeDefs = gql`
  type Person {
    gender: String
    email: String
    phone: String
    city: String
  }

  type Person2 {
    name: String 
    height: String
    birth_year: String  
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

  type Query {
    hello(name: String): String!
    randomPerson: [Person!]!
    people(id: Int!): Person2
    car(plateNumber: String!): Car 
    cars: [Car]
    brands: [Brand]
  }

`;

