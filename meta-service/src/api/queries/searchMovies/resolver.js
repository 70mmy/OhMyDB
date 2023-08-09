const axios = require('axios');

module.exports = (_, {query}) => {
    return axios.get(`http://www.omdbapi.com/?apikey=720c3666&type=movie&s=${query}`)
        .then((response) => {
            return response.data.Search.map((m) => {
                return {
                    title: m.Title,
                    year: m.Year,
                    imdb_id: m.imdbID
                };
            })
        })
}
