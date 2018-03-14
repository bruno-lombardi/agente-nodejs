import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions/auth";
import {
  Card,
  Image,
  Grid
} from "semantic-ui-react";

class ProfilePage extends React.Component {
  state = {};

  renderCard() {
    switch (this.props.user) {
      case null:
        return;
      case false:
        this.props.history.push("/login");
        break;
      default:
        return this.userProfile();
    }
  }

  userProfile() {
    return (
      <Card fluid>
        <Image src={this.props.user.picture} />
        <Card.Content>
          <Card.Header>{this.props.user.google.name}</Card.Header>
          <Card.Description>
            Parabéns {this.props.user.google.name}. Você entrou com sucesso no
            Agente.
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }

  render() {
    return (
      <Grid style={{marginTop: "5em"}}>
        <Grid.Row centered>
          <Grid.Column computer="4" mobile="16" tablet="8" widescreen="4">
            
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default connect(mapStateToProps, { fetchUser })(ProfilePage);
