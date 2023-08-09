var glob = require('glob')
var path = require('path');

var consumers = {};
glob.sync('./src/consumers/*/consumer.js').forEach(function (file) {
    let name = path.basename(path.dirname(file));
    console.log('Loading consumer: ', name);

    consumers[name] = require(path.resolve(file))
});

module.exports = consumers;

