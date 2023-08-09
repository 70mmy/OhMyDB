var amqp = require('amqplib/callback_api');

var consumers = require("./src/consumers/consumers")

amqp.connect('amqp://localhost', function(connectionError, connection) {
    if (connectionError) {
        throw connectionError;
    }

    connection.createChannel(function(channelError, channel) {
        if (channelError) {
            throw channelError;
        }

        var queue = process.argv[2];

        if (Object.keys(consumers).indexOf(queue) === -1) {
            throw new Error('Consumer not found');
        }

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, consumers[queue], {
            noAck: true
        });
    });
});
