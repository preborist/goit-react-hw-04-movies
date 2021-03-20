import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import movieApi from '../../services/movie-api';

class MovieDetailsPage extends Component {
  state = {
    movie: [],
  };

  async componentDidMount() {
    movieApi(`/movie/${this.props.match.params.movieId}`).then(data => {
      if (data) {
        console.log(data);
      }

      this.setState({ movie: data });
    });
  }
  render() {
    const {
      title,
      original_title,
      release_date,
      poster_path,
      overview,
      genres,
    } = this.state.movie;
    console.log(this.props.match.url);
    return (
      <>
        <img
          src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
          alt={title || original_title}
        />
        <h2>
          {title || original_title} ({release_date})
        </h2>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h3>Ganres</h3>
        {genres && (
          <ul>
            {genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        )}
        <p>Additional information</p>
        <Link to={`${this.props.match.url}/cast`}>Cast</Link>
        <Link to={`${this.props.match.url}/reviews`}>Review</Link>
      </>
    );
  }
}

export default MovieDetailsPage;
