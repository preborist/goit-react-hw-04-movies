import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './MoviesPage.scss';

import movieApi from '../../services/movie-api';

class MoviesPage extends Component {
  state = {
    query: '',
    movies: [],
    searchQuery: '',
  };

  handleChange = e => {
    this.setState({
      query: e.currentTarget.value,
      searchQuery: e.currentTarget.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    movieApi(`/search/movie?query=${this.state.query}`).then(data => {
      this.setState({ movies: data.results });
      this.props.history.push({
        search: this.state.searchQuery,
      });
    });
    this.setState({ query: '' });
  };

  async componentDidMount() {
    if (this.props.location.search) {
      movieApi(`/search/movie?query=${this.props.location.search}`).then(
        data => {
          this.setState({ movies: data.results });
        },
      );
    }
  }

  render() {
    const { query, movies } = this.state;
    const { match, location } = this.props;

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

        {movies && (
          <ul className="movies__list">
            {movies.map(({ id, title, original_name }) => (
              <Link
                to={{
                  pathname: `${match.url}/${id}`,
                  state: { from: location },
                }}
                key={id}
                className="movie__link"
              >
                {title || original_name}
              </Link>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default MoviesPage;
