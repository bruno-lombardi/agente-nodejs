import React from "react";
import { Button, Form, Segment, Icon } from "semantic-ui-react";

const LoginForm = () => (
  <Form size="large">
    <Segment stacked>
      <Form.Input
        fluid
        icon="user"
        iconPosition="left"
        placeholder="E-mail address"
      />
      <Form.Input
        fluid
        icon="lock"
        iconPosition="left"
        placeholder="Password"
        type="password"
      />
      <Button color="teal" fluid size="large">
        Login
      </Button>
    </Segment>
  </Form>
);

export default LoginForm;
