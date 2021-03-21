import React, { Component } from 'react';
import moviesApi from '../../services/movie-api';
import { Link } from 'react-router-dom';
import '../MoviesPage/MoviesPage.scss';

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
        <ul className="movies__list">
          {this.state.movies.map(({ id, title, original_name }) => (
            <Link
              to={{
                pathname: `/movies/${id}`,
                state: { from: this.props.location },
              }}
              key={id}
              className="movie__link"
            >
              {title || original_name}
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default HomePage;
