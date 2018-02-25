import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon,
  Divider
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

class LoginPage extends React.Component {
  state = {
    showEmailForm: false
  };

  handleShowEmailForm = () => {
    this.setState(prevState => ({
      showEmailForm: prevState.showEmailForm ? false : true
    }));
  };

  render() {
    return (
      <div className="login-form">
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Entre na sua conta
            </Header>

            {this.state.showEmailForm ? (
              <div>
                <Button
                  style={{ marginBottom: "1em" }}
                  circular
                  color="blue"
                  icon="arrow left"
                  onClick={this.handleShowEmailForm}
                />
                <LoginForm />
              </div>
            ) : (
              <Segment padded>
                <a href="/auth/google">
                  <Button color="google plus" fluid style={{ marginBottom: "1em" }}>
                    <Icon name="google" /> Entrar com Google
                  </Button>
                </a>
                <Button fluid color="facebook">
                  <Icon name="facebook" /> Entrar com Facebook
                </Button>
                <Divider horizontal>Ou</Divider>
                <Button onClick={this.handleShowEmailForm} secondary fluid>
                  Entrar com email
                </Button>
              </Segment>
            )}
            <Message>
              Ainda não tem uma conta? <Link to="/login">Crie uma conta</Link>{" "}
              grátis
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginPage;
