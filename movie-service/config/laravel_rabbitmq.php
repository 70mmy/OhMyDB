<?php
/** For documentation, see https://github.com/needle-project/laravel-rabbitmq */
return [
    'connections' => [
        'connection' => [
            'hostname' => '172.18.0.3'
        ],
    ],
    'exchanges' => [
        'movie-meta-movie-created' => [
            'connection' => 'connection',
            'name' => 'movie-meta-movie-created',
            'attributes' => [
                'exchange_type' => 'topic'
            ]
        ]
    ],
    'queues' => [
        'movie-created' => [
            'connection' => 'connection',
            'name' => 'movie-created',
            'attributes' => [
                'bind' => [
                    ['exchange' => 'movie-meta-movie-created', 'routing_key' => '*']
                ]
            ]
        ]
    ],
    'publishers' => [
        'movieCreated' => 'movie-created'
    ],
    'consumers' => []
];
