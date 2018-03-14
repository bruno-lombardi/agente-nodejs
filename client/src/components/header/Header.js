import React from "react";
import {
  Container,
  Dropdown,
  Image,
  Menu,
  Input,
  Responsive
} from "semantic-ui-react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser, logoutUser } from "../../actions/auth";

const Avatar = props => (
  <span style={{ display: "flex", alignItems: "center" }}>
    <span style={{ marginRight: ".5em" }}>{props.name}</span>
    <Image avatar src={props.picture} />
  </span>
);

const NarrowAvatar = props => (
  <Image avatar src={props.picture} />
)

class TopHeader extends React.Component {

  handleLogout = () => {
    this.props.logoutUser();
    this.props.history.push("/login");
  }

  narrowMenu() {
    return (
      <Menu borderless fixed="top" size="large">
        <Container>
          <Menu.Item>
            <Link to="/perfil">
              <Image
                fluid
                src="/assets/img/logo-small.svg"
                style={{ maxWidth: "2em" }}
              />
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Input className="icon" icon="search" placeholder="Pesquisar..." />
          </Menu.Item>

          <Menu.Menu position="right">
            <Dropdown
              item
              trigger={<NarrowAvatar picture={this.props.user.picture} />}
              icon={null}
              simple
              pointing="top right"
            >
              <Dropdown.Menu style={{marginRight: "1.1em"}}>
                <Dropdown.Header>Você</Dropdown.Header>
                <Dropdown.Item>Configurações</Dropdown.Item>
                <Dropdown.Item>Meu perfil</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Conta</Dropdown.Header>
                <Dropdown.Item onClick={this.handleLogout}>Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }

  wideMenu() {
    return (
      <Menu borderless fixed="top" size="large" widths={3}>
        <Container>
          <Menu.Item as="a">
            <Image
              fluid
              src="/assets/img/logo.svg"
              style={{ maxWidth: "8em" }}
            />
          </Menu.Item>

          <Menu.Item>
            <Input className="icon" icon="search" placeholder="Pesquisar..." />
          </Menu.Item>

          <Menu.Menu position="right">
            <Dropdown
              style={{ display: "flex" }}
              trigger={
                <Avatar
                  name={this.props.user.firstName + " " + this.props.user.lastName}
                  picture={this.props.user.picture}
                />
              }
              icon={null}
              simple
              pointing="top right"
            >
              <Dropdown.Menu style={{ marginTop: "-4px" }}>
                <Dropdown.Header>Você</Dropdown.Header>
                <Dropdown.Item>Configurações</Dropdown.Item>
                <Dropdown.Item>Meu perfil</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Conta</Dropdown.Header>
                <Dropdown.Item onClick={this.handleLogout}>Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }

  render() {
    console.log("Header props", this.props);
    return (
      <header className="header">
        <Responsive minWidth={768}>{this.wideMenu()}</Responsive>
        <Responsive maxWidth={767}>{this.narrowMenu()}</Responsive>
      </header>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default connect(mapStateToProps, { fetchUser, logoutUser })(withRouter(TopHeader));
