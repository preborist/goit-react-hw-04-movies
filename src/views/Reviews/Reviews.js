import React, { Component } from 'react';

import movieApi from '../../services/movie-api';
import './Reviews.scss';

class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    movieApi(`/movie/${this.props.match.params.movieId}/reviews`).then(data => {
      if (data) {
        this.setState({ reviews: data.results });
      }
    });
  }

  render() {
    const { reviews } = this.state;

    return (
      <>
        {reviews.length !== 0 ? (
          <ul>
            {reviews.map(({ id, author, content }) => (
              <li key={id} className="review__item">
                <h3>Author: {author}</h3>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>We don't have any reviews for this movie.</p>
        )}
      </>
    );
  }
}

export default Reviews;
