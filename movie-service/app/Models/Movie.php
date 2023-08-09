<?php

namespace App\Models;

use App\Events\MovieCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Movie extends Model
{
    use HasFactory;

    protected $with = ['images'];

    public function images(): HasMany
    {
        return $this->hasMany(MovieImage::class);
    }
}
