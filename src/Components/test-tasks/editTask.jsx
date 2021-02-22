/* eslint-disable */
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
  Button,
  Row
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Menu from "../Menu/Menu";
import axios from "axios";
import baseURL from "../../services/base";
import EditTaskZone from "./EditTaskZone.jsx";

import Calendar from "react-date-picker";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

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
      status: "",
      duration: "",
      date: "",
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
    const status = this.state.status;
    const duration = this.state.duration;
    const date = this.state.date;
    console.log(zone);
    axios
      .post(
        `${baseURL}/api/task/edit/${this.props.match.params.id}`,
        { title, description, zone, status, duration },
        { withCredentials: true }
      )
      .then(res => {
        console.log(res);
        // this.setState({ title: "", description: "" });
        this.props.fetchData();
        this.props.history.push("/task");
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
      // console.log("home", this.state);
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

  setDuration = time => {
    this.setState({
      duration: time
    });

    // console.log(this.state.duration)
  };

  setStatus = status => {
    this.setState({
      status: status
    });

    console.log(this.state.duration);
  };

  handleDateChange = date => {
    this.setState({
      date: date
    });
  };

  render() {
    return (
      <div>
        {/* <Menu
          id="landingMenuSticky"
          {...this.props}
          logout={this.props.logout}
          setUser={this.props.setUser}
          fetchData={this.props.fetchData}
        /> */}
            <Container className="task-list-page">
          <Row>
            <Form onSubmit={this.handleUpdateTask} className="edit-form">
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
                Zone:{" "}
                {this.state.zone.name === ""
                  ? ""
                  : this.state.zone.name.toUpperCase()}{" "}
                - {this.state.zone.name === "" ? "" : this.state.zone.address}
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
              <FormLabel>Duration:</FormLabel>
              {/* <FormControl
              type="number"
              name="duration"
              value={this.state.duration}
              onChange={e => this.handleChange(e)}
            />
            Minutes */}

              <Button
                onClick={() => {
                  this.setDuration(5);
                }}
                variant={"outline-info"}
                active={this.state.duration === "5" ? "active" : ""}
              >
                5 mins
              </Button>
              <Button
                onClick={() => {
                  this.setDuration(15);
                }}
                variant={"outline-info"}
                active={this.state.duration === "15" ? "active" : ""}
              >
                15 mins
              </Button>
              <Button
                onClick={() => {
                  this.setDuration(30);
                }}
                variant={"outline-info"}
                active={this.state.duration === "30" ? "active" : ""}
              >
                30 mins
              </Button>
              <Button
                onClick={() => {
                  this.setDuration(60);
                }}
                variant={"outline-info"}
                active={this.state.duration === "60" ? "active" : ""}
              >
                60 mins
              </Button>
              <hr />
              <FormLabel>Status:</FormLabel>
              {/* <FormControl
              type="text"
              name="status"
              value={this.state.status}
              onChange={e => this.handleChange(e)}
            /> */}

            <Button
              onClick={() => {
                this.setStatus("active");
              }}
              variant={"outline-danger"}
              active={this.state.status === "active" ? "active" : ""}
            >
              Active
            </Button>
            <Button
              onClick={() => {
                this.setStatus("complete");
              }}
              variant={"outline-success"}
              active={this.state.status === "complete" ? "active" : ""}
            >
              Complete
            </Button>
            <hr />
            <FormLabel>Due Date: (Coming soon)</FormLabel>
            {/* <FormControl
              type="text"
              name="date"
              value={this.state.date}
              onChange={e => this.handleChange(e)}
            /> */}

            <DatePicker name="date"
        selected={this.state.date}
        onChange={this.handleDateChange}
        autoComplete="no"
      />

              <hr />
              <FormGroup>
                <button className="btn btn-warning">Update</button>
              </FormGroup>
            </Form>
          </Row>
        </Container>
      </div>
    );
  }
}

export default EditTask;
