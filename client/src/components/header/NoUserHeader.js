import React from "react";
import { Container, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class TopHeader extends React.Component {
  render() {
    return (
      <header className="header">
        <Menu borderless fixed="top" size="large" widths={1}>
          <Container>
            <Menu.Item>
              <Link to="/">
                <Image
                  fluid
                  src="/assets/img/logo.svg"
                  style={{ maxWidth: "8em" }}
                />
              </Link>
            </Menu.Item>
          </Container>
        </Menu>
      </header>
    );
  }
}
