import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions/auth";
import {
  Card,
  Icon,
  Image,
  Segment,
  Dimmer,
  Loader,
  Grid
} from "semantic-ui-react";

const Loading = () => (
  <Segment style={{ height: "10em" }}>
    <Dimmer active>
      <Loader size="large" inline content="Carregando" />
    </Dimmer>
  </Segment>
);

class ProfilePage extends React.Component {
  state = {};

  renderCard() {
   switch(this.props.auth) {
    case null:
     return (
      <Loading />
     )
    case false:
     this.props.history.push("/login")
     break;
    default:
     return this.card()
   }
  }

  card() {
    return (
      <Card fluid>
        <Image  src={this.props.auth.picture} />
        <Card.Content>
          <Card.Header>{this.props.auth.google.name}</Card.Header>
          <Card.Description>
            Parabéns {this.props.auth.google.name}. Você entrou com sucesso no
            Agente.
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }

  render() {
    return (
      <Grid padded>
        <Grid.Row centered>
          <Grid.Column width={4}>
            {this.renderCard()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default connect(mapStateToProps, { fetchUser })(ProfilePage);
