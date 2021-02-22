// Components
/* eslint-disable */
import React, { Component } from "react";
import { Container, Button, Form } from "react-bootstrap";
import Axios from "axios";
import baseURL from "../../services/base";

// Project Components
import Menu from "../Menu/Menu";
// import actions from "../../services/index";

// Styling
import "./SignUp.css";
import { Link } from "react-router-dom";

export default class Signup extends Component {
  // state = {
  //   email: "testing"+Math.random()+"@mail.com",
  //   password: "12345678",
  // }
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSignUpForm = event => {
    event.preventDefault();

    if (this.state.email) {
      let user = {
        email: this.state.email,
        password: this.state.password,
        username: "CloudTaskr" + Math.floor(Math.random() * 500)
      };

      Axios.post(`${baseURL}/api/signup`, user, { withCredentials: true })
        .then(response => {
          this.setState({
            email: "",
            password: ""
          });
          this.props.history.push("/task");
          this.props.setUser(response.data);
          // this.props.setFlashMessage("Sign up successful", true)
        })
        .catch(err => {
          // this.props.setFlashMessage("Sign up failed", false)
          console.log(err);
        });
    }
  };

  backgroundImage = {
    backgroundImage:
      "url(" +
      process.env.PUBLIC_URL +
      "/images/books-business-computer-connection-459654.jpg)"
  };

  render() {
    let styles = {
      borderRadius: "20px",
  backgroundColor: "#2F0152",
  borderColor: "#2F0152",
  width: "100px"
    }

    return (
      <>
        {/* <Menu
          id="landingMenuSticky"
          {...this.props}
          logOut={this.props.logOut}
          setUser={this.props.setUser}
          fetchData={this.props.fetchData}
          setFlashMessage={this.props.setFlashMessage}
        /> */}
        <div className="signup-back-img" >
        
        <Container className="login-form" style={{paddingTop:"200px"}}>
          <h1>Join today!</h1>
          <Form className="sign-up-form" onSubmit={this.handleSignUpForm}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control style={{width:"500px"}}
                name="email"
                type="email"
                placeholder="Enter email"
                defaultValue={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control style={{width:"500px"}}
                name="password"
                type="password"
                placeholder="Password"
                defaultValue={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div>
              <Button style={styles} type="submit">Sign up</Button> <Link to="/login">Already have an account? Login</Link>
            </div>
          </Form>
        </Container>
        </div>
      </>
    );
  }
}
