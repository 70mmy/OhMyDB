var express = require("express")
var {graphqlHTTP} = require("express-graphql")
var graphql = require("graphql")
var cors = require('cors')

var queries = require("./src/api/queries")

var query = {
    name: "Query",
    fields: {},
};

Object.keys(queries).forEach((name) => {
    let q = queries[name];

    query.fields[name] = q;
})

// Define the Query type
var queryType = new graphql.GraphQLObjectType(query)
var schema = new graphql.GraphQLSchema({query: queryType})

var app = express()
app.use(cors())
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    })
)
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")
