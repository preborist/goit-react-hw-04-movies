import React, { Component } from 'react';
import moviesApi from '../services/movie-api';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    moviesApi('/trending/all/day').then(data => {
      this.setState({ movies: data.results });
    });
  }

  render() {
    return (
      <div>
        <h1>Это Home View</h1>
        <ul>
          {this.state.movies.map(movie => (
            <Link to={`/movies/${movie.id}`} key={movie.id}>
              {movie.title || movie.original_name}
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default HomePage;
