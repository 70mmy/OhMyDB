const axios = require('axios');

module.exports = function(msg) {
    let movie = JSON.parse(msg.content.toString());
    console.log("Received: ", movie);

    axios.get(`http://www.omdbapi.com/?apikey=720c3666&type=movie&i=${movie.imdb_id}`)
        .then((response) => {
            let omdbMovie = response.data;

            movie.title = omdbMovie.Title;
            movie.images = [
                omdbMovie.Poster
            ]

            console.log(movie)

            axios.put(`http://laravel/api/movies/${movie.id}`, movie)
                .then((res) => {
                    console.log(res.data);
                })
        })
};
