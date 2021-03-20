import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import AppBar from './components/AppBar';
import MovieDetailsPage from './components/MovieDetailsPage';
import NotFoundView from './views/NotFoundView';

const App = () => (
  <>
    <AppBar />

    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/movies/:movieId" component={MovieDetailsPage} />
      <Route path="/movies" component={MoviesPage} />
      <Route component={NotFoundView} />
    </Switch>
  </>
);

export default App;
