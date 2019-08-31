import React, { Component } from "react";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import { Switch, Route, Redirect } from "react-router-dom";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import Customers from "./components/Customers";
import Register from "./components/RegisterForm";
import MoviesForm from "./components/MoviesForm";
import LoginForm from "./components/LoginForm";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MoviesForm} />
            <Route path="/register" component={Register} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/customers" component={Customers} />
            <Route path="/movies" component={Movies} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/moviesForm/:id" component={MoviesForm} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
