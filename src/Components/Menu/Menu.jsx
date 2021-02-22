// components
/* eslint-disable */
import React from "react";
import Axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import baseURL from "../../services/base";

// Custom Components
import LoginForm from "../LoginForm/LoginForm";

// Styles
import { Navbar, Nav } from "react-bootstrap";
import "./Menu.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTasks,
  faSignOutAlt,
  faWalking
} from "@fortawesome/free-solid-svg-icons";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      hideButton: false
    };
  }
  toggleLoginButton = e => {
    let loginSection = document.getElementById("login-form");
    let toggle = !this.state.hideButton;
    this.setState({ hideButton: toggle });

    loginSection.classList.remove("hidden");
    loginSection.classList.add("reveal");
  };

  toggleLoginButtonOff = e => {
    let loginSection = document.getElementById("login-form");
    let toggle = !this.state.hideButton;
    this.setState({ hideButton: toggle });

    loginSection.classList.remove("reveal");
    loginSection.classList.add("hidden");
  };

  handleLoginForm = event => {
    event.preventDefault();

    if (this.state.email) {
      let user = {
        email: this.state.email,
        password: this.state.password
      };
      // console.log(user);

      Axios.post(`${baseURL}/api/login`, user, {
        withCredentials: true
      })
        .then(response => {
          // console.log("handleFormSubmit");
          this.setState({
            email: "",
            password: ""
          });
          this.props.setUser(response.data);
          this.props.fetchData();
          this.props.setFlashMessage("Login successful", true);
          this.props.history.push("/task");
        })
        .catch(err => {
          // this.props.setFlashMessage("Login failed", false)
          console.log(err);
        });
    } else {
      // figure out how to flash message
      console.log("please input both email and password");
      this.toggleLoginButtonOff();
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  logoStyle = { width: "160px" };
  render() {
    return (
      <Navbar bg="info" variant="dark" id={this.props.id}>
        {/* left side navbar */}
        <LinkContainer to="/">
          <Navbar.Brand id="logo">
            <img src="/images/logo.png" style={this.logoStyle} />
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          {/* <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer> */}
          {!this.props.userObj && (
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          )}
        </Nav>

        {/* right side navbar */}
        {/* condition ? (true) : (false) */}
        {this.props.userObj ? (
          <Nav id="logged-right-nav">
            <ul id="logged-right-list" className="fa-ul">
              <li className="logged-items">
                <LinkContainer to="/account">
                  <Nav.Link className="sign-up">
                    <h5 style={{ color: "white" }}>
                      <FontAwesomeIcon icon={faUser} listItem />{" "}
                      {this.props.userObj.username}
                    </h5>
                  </Nav.Link>
                </LinkContainer>
              </li>
              <li className="logged-items">
                <LinkContainer to="/task">
                  <Nav.Link className="sign-up">
                    <h5 style={{ color: "white" }}>
                      <FontAwesomeIcon icon={faTasks} listItem /> Task
                    </h5>
                  </Nav.Link>
                </LinkContainer>
              </li>
              <li className="logged-items">
                <LinkContainer to="/">
                  <Nav.Link className="sign-up" onClick={this.props.logout}>
                    <h5 style={{ color: "white" }}>
                      <FontAwesomeIcon icon={faWalking} listItem />
                      Logout
                    </h5>
                  </Nav.Link>
                </LinkContainer>
              </li>
            </ul>
          </Nav>
        ) : (
          <>
            <Nav>
              <LinkContainer to="/signup">
                <Nav.Link className="sign-up">Signup</Nav.Link>
              </LinkContainer>
            </Nav>
            {/* login code block */}
            <Nav className="menu-form">
              <div id="login-form" className="hidden">
                <LoginForm {...this.props} formType="menu" />
              </div>
              {this.state.hideButton === false && (
                <Nav.Link id="login" onClick={this.toggleLoginButton}>
                  Login
                </Nav.Link>
              )}
            </Nav>
          </>
        )}
      </Navbar>
    );
  }
}
