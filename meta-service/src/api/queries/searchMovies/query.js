var graphql = require("graphql")
var resolver = require("./resolver")
var type = require("../../types/movie")

var args = {
    query: {type: graphql.GraphQLString},
}

module.exports = {
    type: new graphql.GraphQLList(type),
    args: args,
    resolve: resolver,
};
