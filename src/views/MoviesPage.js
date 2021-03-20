import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import movieApi from '../services/movie-api';

class MoviesPage extends Component {
  state = {
    query: '',
    movies: [],
  };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    movieApi(`/search/movie?query=${this.state.query}`).then(data => {
      this.setState({ movies: data.results });
    });
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    console.log(this.props.match.url);
    return (
      <>
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.handleSubmit}>
            <input
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search movies"
              value={query}
              onChange={this.handleChange}
            />

            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Search</span>
            </button>
          </form>
        </header>

        {this.state.movies && (
          <ul>
            {this.state.movies.map(movie => (
              <Link to={`${this.props.match.url}/${movie.id}`} key={movie.id}>
                {movie.title || movie.original_name}
              </Link>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default MoviesPage;
