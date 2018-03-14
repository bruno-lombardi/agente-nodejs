import React from "react";
import { Button, Form, Segment, Icon, Message } from "semantic-ui-react";
import {loginWithCredentials, setFields} from "../actions/auth";
import {connect} from "react-redux";

class LoginForm extends React.Component {

  handleChangeEmail = (e, { value }) => this.props.setFields({ "email": value, "password": this.props.login.password });
  handleChangePassword = (e, { value }) => this.props.setFields({ "email": this.props.login.email, "password": value });

  onSubmit = (e) => {
    const email = this.props.login.email;
    const password = this.props.login.password;
    this.props.loginWithCredentials(email, password);
  }
  render() {
    return (
      <div>
        <Form size="large" onSubmit={this.onSubmit}>
          <Segment className="attached">
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Email"
              type="email"
              name="email"
              value={this.props.login.email}
              onChange={this.handleChangeEmail}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Senha"
              type="password"
              name="password"
              value={this.props.login.password}
              onChange={this.handleChangePassword}
            />
            <Button color="teal" fluid size="large">
              Entrar
            </Button>
          </Segment>
          {this.props.login.err.message ? (
            <Message attached="bottom" negative>
              <Icon name="x" />
              {this.props.login.err.message}
            </Message>
          ) : null}
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    err: state.err
  };
}

export default connect(mapStateToProps, { loginWithCredentials, setFields })(LoginForm);
