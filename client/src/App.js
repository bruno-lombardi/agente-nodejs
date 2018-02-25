import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import LoginPage from "./components/Login";
import {connect} from "react-redux";
import {fetchUser} from "./actions/auth";
import ProfilePage from "./components/ProfilePage";

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/login" component={LoginPage} exact={true} />
            <Route path="/perfil" component={ProfilePage} exact={true} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, {fetchUser})(App);
