import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Spinner from "./components/ui-elements/Spinner";
import MainNavigation from "./components/navigation/MainNavigation";

import { useAuth } from "./hooks/auth-hook";
import { AuthContext, AuthContextProps } from "./context/auth-context";

const Auth = React.lazy(() => import("./pages/Auth"));
const Users = React.lazy(() => import("./pages/Users"));
const NewPlace = React.lazy(() => import("./pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./pages/UpdatePlace"));

const App: React.FC = () => {
  const { token, login, logout, userId } = useAuth();

  const context: AuthContextProps = {
    isLoggedIn: !!token,
    userId,
    token,
    login,
    logout,
  };

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={context}>
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <Spinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
