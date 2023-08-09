const graphql = require("graphql/index");

module.exports = new graphql.GraphQLObjectType({
    name: "Movie",
    fields: {
        title: {type: graphql.GraphQLString},
        year: {type: graphql.GraphQLString},
        imdb_id: {type: graphql.GraphQLString},
    },
})
