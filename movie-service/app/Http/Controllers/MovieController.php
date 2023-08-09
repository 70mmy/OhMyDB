<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\MovieImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class MovieController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $movies = Movie::get();

        return response()->json(["data" => $movies], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->getRules($request), $this->getMessages());
        if ($validator->fails()) {
            $messages = $validator->messages();

            return response()->json(["messages" => $messages], 500);
        }

        $movie = $this->updateMovie($request);
        $movie->save();

        return response()->json(["data" => $movie, "message" => "Movie has been created successfully"], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Movie $movie)
    {
        return response()->json(["data" => $movie]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Movie $movie)
    {
        $validator = Validator::make($request->all(), $this->getRules($request, $movie), $this->getMessages());
        if ($validator->fails()) {
            $messages = $validator->messages();

            return response()->json(["messages" => $messages], 500);
        }

        $movie = $this->updateMovie($request, $movie);
        $movie->save();

        return response()->json(["data" => $movie, "message" => "Movie has been updated successfully"], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movie $movie)
    {
        $movie = Movie::destroy($movie->id);

        return response()->json(["message" => "Movie has been deleted successfully"]);
    }

    private function getRules(Request $request, ?Movie $movie = null): array
    {
        $rules = [
            'title' => [
                'required'
            ]
        ];

        if (!empty($request->imdb_id)) {
            $rules['imdb_id'] = [
                $movie ? Rule::unique('movies')->ignore($movie->id) : Rule::unique('movies')
            ];
        }

        return $rules;
    }

    private function getMessages()
    {
        return [
            'title.required' => 'Movie title is required.',
            'imdb_id.unique' => 'IMDB ID already exists in the database'
        ];
    }

    private function updateMovie(Request $request, ?Movie $movie = null): Movie
    {
        if (null === $movie) {
            $movie = new Movie();
        }

        $movie->title = $request->title;
        $movie->imdb_id = $request->imdb_id;

        foreach ($request->images ?? [] as $image) {
            $imageModel = MovieImage::where('movie_id', $movie->id)
                ->where('url', $image)->first();

            if (!$imageModel) {
                $imageModel = new MovieImage();

                $imageModel->movie_id = $movie->id;
                $imageModel->url = $image;

                $imageModel->save();
            }
        }

        return $movie;
    }
}
