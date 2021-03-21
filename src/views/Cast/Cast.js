import React, { Component } from 'react';

import movieApi from '../../services/movie-api';
import './Cast.scss';

class Cast extends Component {
  state = {
    cast: [],
  };

  async componentDidMount() {
    movieApi(`/movie/${this.props.match.params.movieId}/credits`).then(data => {
      if (data) {
        this.setState({ cast: data.cast });
      }
    });
  }

  render() {
    const { cast } = this.state;
    return (
      <>
        {cast.length > 0 ? (
          <ul className="cast__list">
            {cast.map(({ id, name, profile_path, character }) => (
              <li key={id} className="cast__item">
                <img
                  src={`https://www.themoviedb.org/t/p/w138_and_h175_face${profile_path}`}
                  alt={name}
                />
                <p>{name}</p>
                <p>Character: {character}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>We don't have any cast information for this movie.</p>
        )}
      </>
    );
  }
}

export default Cast;
