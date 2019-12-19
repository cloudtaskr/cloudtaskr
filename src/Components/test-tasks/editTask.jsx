import React, { Component } from "react";
// import Axios from 'axios';

// import { Row } from "react-bootstrap";
// import { Col } from "react-bootstrap";
import {
  FormControl,
  Form,
  FormGroup,
  FormLabel,
  Container,
  Button
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Menu from "../Menu/Menu";
import axios from "axios";
import baseURL from "../../services/base";
import EditTaskZone from "./EditTaskZone.jsx";

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      showZoneInput: false,
      zone: {
        name: "",
        address: "",
        lat: "",
        lng: ""
      },
      active: ""
    };
  }

  componentDidMount() {
    // console.log(this);

    axios
      .get(`${baseURL}/api/task/edit/${this.props.match.params.id}`, {
        withCredentials: true
      })
      .then(res => {
        console.log(res.data);
        this.setState(res.data);
      });
  }

  handleUpdateTask = event => {
    event.preventDefault();

    const title = this.state.title;
    const description = this.state.description;
    const zone = this.state.zone;
    console.log(zone);
    axios
      .post(
        `${baseURL}/api/task/edit/${this.props.match.params.id}`,
        { title, description, zone },
        { withCredentials: true }
      )
      .then(res => {
        console.log(res);
        // this.props.getData();
        // this.setState({ title: "", description: "" });
        this.props.fetchData();
        // this.props.history.push("/task");
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    // console.log(event, event.target, event.target.value);
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  selectZone = location => {
    if (location === "home") {
      console.log("home", this.state);
      if (this.props.userObj.zones.home.address === "") {
        this.setState({ showZoneInput: true, active: "home" });
      } else {
        this.setState({
          zone: {
            name: this.props.userObj.zones.home.name,
            address: this.props.userObj.zones.home.address,
            lat: this.props.userObj.zones.home.lat,
            lng: this.props.userObj.zones.home.lng
          },
          showZoneInput: false,
          active: "home"
        });
      }
    }
    if (location === "work") {
      console.log("work", this.state);
      this.setState({
        zone: {
          name: this.props.userObj.zones.work.name,
          address: this.props.userObj.zones.work.address,
          lat: this.props.userObj.zones.work.lat,
          lng: this.props.userObj.zones.work.lng
        },
        showZoneInput: false,
        active: "work"
      });
    }
    if (location === "custom") {
      console.log("custom", this.state);
      this.toggleShowZoneInput();
    }
  };

  toggleShowZoneInput = () => {
    this.setState({
      showZoneInput: !this.state.toggleShowZoneInput
    });
  };

  render() {
    return (
      <div>
        <Menu
          id="landingMenuSticky"
          {...this.props}
          logout={this.props.logout}
          setUser={this.props.setUser}
          fetchData={this.props.fetchData}
        />
        <Container>
          <Form onSubmit={this.handleUpdateTask}>
            <FormLabel>
              {" "}
              <FontAwesomeIcon icon={faList} /> Title:
            </FormLabel>
            <FormControl
              type="text"
              name="title"
              value={this.state.title}
              onChange={e => this.handleChange(e)}
              required
            />
            <hr />
            <FormLabel>Description:</FormLabel>
            <FormControl
              type="text"
              name="description"
              value={this.state.description}
              onChange={e => this.handleChange(e)}
            />
            <hr />
            <FormLabel>
              Zone: {this.state.zone.name === "" ?  "" : this.state.zone.name.toUpperCase() } - {" "}
              {this.state.zone.name === "" ? "":this.state.zone.address } 
            </FormLabel>
            <EditTaskZone
              userObj={this.props.userObj}
              showZoneInput={this.state.showZoneInput}
              selectZone={this.selectZone}
              active={
                this.state.active === ""
                  ? this.state.zone.name
                  : this.state.active
              }
            />
            <hr />
            <FormGroup>
              <button className="btn btn-warning">Update</button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default EditTask;
