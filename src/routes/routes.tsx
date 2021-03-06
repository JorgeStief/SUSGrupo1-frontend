import {
  Route,
  BrowserRouter,
  RouteComponentProps,
  Redirect,
  Switch,
} from 'react-router-dom';

import React from 'react';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Menu from '../pages/Menu';
import History from '../pages/History';
import { isAuthenticated } from '../services/auth';

interface Props {
  component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
}

const PrivateRoute = ({ component: Component, path, exact = false }: Props) => (
  <Route
    exact={exact}
    path={path}
    render={(props: RouteComponentProps) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={SignIn} path="/" exact />
        <Route component={SignUp} path="/cadastrar" />
        <PrivateRoute component={Menu} path="/consulta/marcar" />
        <PrivateRoute component={History} path="/consulta/historico" />
        <Route path="*" component={() => <h1>Page not found</h1>} />
        {/* <Route component={SearchPoint} path="/search-point" /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
