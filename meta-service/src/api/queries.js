var glob = require('glob')
var path = require('path');

var queries = {};
glob.sync('./src/api/queries/*/query.js').forEach(function (file) {
    let name = path.basename(path.dirname(file));
    console.log('Loading query: ', name);

    queries[name] = require(path.resolve(file))
});

module.exports = queries;

