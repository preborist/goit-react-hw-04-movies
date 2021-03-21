import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import movieApi from '../../services/movie-api';
import routes from '../../routes';
import './MovieDetailsPage.scss';

class MovieDetailsPage extends Component {
  state = {
    movie: [],
  };

  async componentDidMount() {
    movieApi(`/movie/${this.props.match.params.movieId}`).then(data => {
      if (data) {
        this.setState({ movie: data });
      }
    });
  }

  handleGoBack = () => {
    const { state } = this.props.location;
    const { history } = this.props;
    if (state && state.from) {
      history.push(state.from);
    } else {
      history.push(routes.home);
    }
  };

  render() {
    const {
      title,
      original_title,
      release_date,
      poster_path,
      overview,
      genres,
      vote_average,
    } = this.state.movie;

    const { url } = this.props.match;
    return (
      <>
        <button type="button" onClick={this.handleGoBack}>
          Go back
        </button>
        {this.state.movie.length !== 0 ? (
          <div>
            <div className="movie__container">
              <img
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
                alt={title || original_title}
                className="movie_poster"
              />
              <div className="movie__info">
                <h2 className="movie__title">
                  {title || original_title} ({release_date?.split('-')[0]})
                </h2>
                <p className="movie__score">User score: {vote_average * 10}%</p>
                <div className="movie__overview">
                  <h3>Overview</h3>
                  <p>{overview}</p>
                </div>
                {genres && (
                  <ul>
                    <h3>Ganres</h3>
                    {genres.map(genre => (
                      <li key={genre.id}>{genre.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div>
              <p>Additional information</p>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: {
                    search: this.props.location.search,
                    from: this.props.location.state.from,
                  },
                }}
                className="movie__link"
              >
                Cast
              </NavLink>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: {
                    search: this.props.location.search,
                    from: this.props.location.state.from,
                  },
                }}
                className="movie__link"
              >
                Review
              </NavLink>
            </div>
          </div>
        ) : (
          <p>No information about this movie</p>
        )}
      </>
    );
  }
}

export default MovieDetailsPage;
