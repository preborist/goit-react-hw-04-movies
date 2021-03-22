import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import routes from './routes';

import AppBar from './components/AppBar';

const HomePage = lazy(
  () => import('./views/HomePage') /* webpackChunkName: "HomePage" */,
);
const MoviesPage = lazy(
  () => import('./views/MoviesPage') /* webpackChunkName: "MoviesPage" */,
);
const MovieDetailsPage = lazy(
  () =>
    import(
      './views/MovieDetailsPage'
    ) /* webpackChunkName: "MovieDetailsPage" */,
);
const Cast = lazy(() => import('./views/Cast') /* webpackChunkName: "Cast" */);
const Reviews = lazy(
  () => import('./views/Reviews') /* webpackChunkName: "Reviews" */,
);

const App = () => (
  <>
    <AppBar />
    <Suspense fallback={<h2>Loading...</h2>}>
      <Switch>
        <Route exact path={routes.home} component={HomePage} />
        <Route path={routes.movieDetails} component={MovieDetailsPage} />
        <Route path={routes.movies} component={MoviesPage} />
        <Redirect to={routes.home} />
      </Switch>
    </Suspense>
    <Suspense fallback={<h2>Loading...</h2>}>
      <Switch>
        <Route path={routes.movieCast} component={Cast} />
        <Route path={routes.movieReviews} component={Reviews} />
      </Switch>
    </Suspense>
  </>
);

export default App;
