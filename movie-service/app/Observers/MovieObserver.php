<?php

namespace App\Observers;

use App\Models\Movie;
use NeedleProject\LaravelRabbitMq\PublisherInterface;

class MovieObserver
{
    /**
     * Handle the Movie "created" event.
     */
    public function created(Movie $movie): void
    {
        $publisher = app()->makeWith(PublisherInterface::class, ['movieCreated']);

        $publisher->publish($movie->toJson());
    }
}
