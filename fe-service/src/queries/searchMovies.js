import {gql} from '@apollo/client';

const SEARCH_MOVIES = gql`
  query SearchMovies(
    $query: String
) {
  searchMovies(query: $query) {
    title
    year
    imdb_id
  }
}
`;

export default SEARCH_MOVIES;
