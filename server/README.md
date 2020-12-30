# GraphQL Demo 

Sample code using [Apollo GraphQL server](https://www.apollographql.com/docs/tutorial/introduction/) 

It shows how to retrieve data from 4 different REST APIs:

1. https://api.moltin.com/v2/brands (needs an account)
2. https://swapi.dev/api/people/
3. https://api.randomuser.me/
4. https://mvrp.herokuapp.com/api/

## Usage

```sh
git clone git@github.com:riccardo-larosa/GraphQL-demo.git
cd Graph-QL-demo
npm start
```
the localhost versions runs on port 4001 -
Open your browser to http://localhost:4001/ to see the Playground in action. 

For the Elastic Path API you need to add in the HTTP Headers the Authorization token

```json
{
  "Authorization": "Bearer <INSERT-YOUR-TOKEN-HERE"
}
```

Examples of queries that you can run:
```js
{
  randomPerson {
    gender
    phone
    city
    email
  }
  people(id:1) {
    name
    height
  }
  car(plateNumber:"EPE68ET") {
    plateNumber
    color
    model
  }
  cars {
    plateNumber
    color
    model
  }
  brands {
    id
    type
    name
  }
}
```