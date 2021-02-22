/* eslint-disable */
import React, { Component } from "react";
import { Container, FormLabel } from "react-bootstrap";
import baseURL from "../../services/base";

// Custom componenets
import Menu from "../Menu/Menu";
import Loading from "../Loading/Loading";
import Welcome from "../Messages/Welcome";
import BackgroundWithOverlay from "../BackgroundWithOverlay/BackgroundWithOverlay";
// Styling
import "./Account.css";
import { Form, FormControl, Button } from "react-bootstrap";
import Axios from "axios";
import Zones from "./Zones/Zones";

let pageBackground = {
  backgroundImage:
    "url(" + process.env.PUBLIC_URL + "/images/light-sun-cloud-japan-45848.jpg)"
};
export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      // zones: {
      //   name: '',
      //   address: '',
      //   lat: '',
      //   lng: ""
      // },
      ready: true
    };
  }

  handleUsernameUpdate = event => {
    event.preventDefault();

    let update = {
      username: this.state.username
    };

    Axios.post(`${baseURL}/api/editprofile/username`, update, {
      withCredentials: true
    })
      .then(response => {
        // this.props.history.push("/tasks");
        this.props.setUser(response.data);
        this.props.setFlashMessage("Username is set", true);
        // this.props.getUser();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleNameUpdate = event => {
    event.preventDefault();

    let update = {
      firstName: this.state.firstName,
      lastName: this.state.lastName
    };

    Axios.post(`${baseURL}/api/editprofile/name`, update, {
      withCredentials: true
    })
      .then(response => {
        // this.props.history.push("/tasks");
        this.props.setUser(response.data);
        this.props.setFlashMessage("Name is set", true);
        // this.props.getUser();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    // console.log(this.state)
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    // if (this.props.taskDataIsReady) {
    return (
      <>
        {/* <Menu
          id="landingMenuSticky"
          {...this.props}
          logout={this.props.logout}
          setUser={this.props.setUser}
        /> */}
        {/* <BackgroundWithOverlay
          imgUrl="light-sun-cloud-japan-45848.jpg"
          alpha=".1"
        /> */}
        <Container >
        <div className="account-container">
          
          <Welcome userObj={this.props.userObj} />
          <section>
            <Form onSubmit={this.handleUsernameUpdate}>
              <Form.Group controlId="username">
                <FormLabel>Set a Username:</FormLabel>
                <FormControl
                  type="text"
                  name="username"
                  defaultValue={
                    this.props.userObj && this.props.userObj.username
                  }
                  onChange={e => this.handleChange(e)}
                  placeholder="Set a username"
                />
              </Form.Group>

              <div>
                <Button type="submit">Update</Button>
              </div>
            </Form>

            <Form onSubmit={this.handleNameUpdate}>
              <Form.Group controlId="name">
                <FormLabel>First Name:</FormLabel>
                <FormControl
                  type="text"
                  name="firstName"
                  defaultValue={
                    this.props.userObj && this.props.userObj.firstName
                  }
                  onChange={e => this.handleChange(e)}
                  placeholder="Enter your first name"
                />
                <FormLabel>Last name:</FormLabel>
                <FormControl
                  type="text"
                  name="lastName"
                  defaultValue={
                    this.props.userObj && this.props.userObj.lastName
                  }
                  onChange={e => this.handleChange(e)}
                  placeholder="Enter your last name"
                />
              </Form.Group>
              <div>
                <Button type="submit">Update</Button>
              </div>
            </Form>

            <hr />
            <hr />

            <Zones
              setFlashMessage={this.props.setFlashMessage}
              setUser={this.props.setUser}
              userObj={this.props.userObj}
              zoneName="home"
            />
            <hr />

            <Zones
              setFlashMessage={this.props.setFlashMessage}
              setUser={this.props.setUser}
              userObj={this.props.userObj}
              zoneName="work"
            />

            <hr />
          </section>

        </div>
        </Container>
      </>
    );
    // } else {
    //   return <Loading />;
    // }
  }
}
