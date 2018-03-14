import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import LoginPage from "./components/Login";
import { connect } from "react-redux";
import { fetchUser } from "./actions/auth";
import ProfilePage from "./components/ProfilePage";
import Header from "./components/header/Header";
import NoUserHeader from "./components/header/NoUserHeader";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    console.log("App state", this.state);
  }

  switchAuthenticationRender(el, def) {
    switch (this.props.user) {
      case null:
        return;
      case false:
        return def;
      default:
        return el;
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          {this.switchAuthenticationRender(<Header />, <NoUserHeader />)}
          <Switch>
            <Route path="/login" component={LoginPage} exact={true} />
            <Route path="/perfil" component={ProfilePage} exact={true} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default connect(mapStateToProps, { fetchUser })(App);
