/* eslint-disable */
import React, { Component } from "react";
import Menu from "../Menu/Menu";
import { Button, Container, Row, Card } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrash,
  faEllipsisV
} from "@fortawesome/free-solid-svg-icons";
import AddTask from "./addTask";

import axios from "axios";
import baseURL from "../../services/base";
import { Alert } from "react-bootstrap";

export default class SmartTasks extends Component {
  render() {
    return (
      <div>
        <div 
        // className={this.props.showDurationAlert ? "show" : "hide"}
        >
        <Card style={{ width: "18rem" }} >
          <Card.Body>
            <Card.Title>How much free time do you have?</Card.Title>
            {/* <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle> */}
            <Card.Text>
              Set the number of minutes you're available and we'll recommend
              tasks for you to complete.
            </Card.Text>
            <Button
              onClick={() => {
                this.props.filterDuration(5);
              }}
              variant="outline-success"
            >
              5 mins
            </Button>
            <Button
              onClick={() => {
                this.props.filterDuration(15);
              }}
              variant="outline-success"
            >
              15 mins
            </Button>
            <Button
              onClick={() => {
                this.props.filterDuration(30);
              }}
              variant="outline-success"
            >
              30 mins
            </Button>
          </Card.Body>
        </Card>
        </div>
      <div className={!this.props.showHomeAlert ? "show" : "hide"}>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>You're near Home</Card.Title>
            {/* <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle> */}
            <Card.Text>Would you like to show your tasks at home?</Card.Text>
            <Button
              onClick={() => {
                this.props.filterHomeTasks("yes");
              }}
              variant="outline-success"
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                this.props.filterHomeTasks("no");
              }}
              variant="outline-danger"
            >
              No
            </Button>
          </Card.Body>
        </Card>
        </div>
        {/* <Alert show={this.props.showHomeAlert} variant="success">
        <Alert.Heading>You're near Home</Alert.Heading>
        <p>
          Would you like to show your tasks at home?
        </p>
        <hr />
        <div className="d-flex justify-content-center align-content-center">
          <Button onClick={()=>{this.props.filterHomeTasks("yes")}} variant="outline-success">
            Yes
          </Button>
          <Button onClick={()=>{this.props.filterHomeTasks("no")}} variant="outline-danger">
            No
          </Button>
        </div>
      </Alert> */}
      <div 
      className={!this.props.showWorkAlert ? "" : "hide"}
      >
          
      <Card style={{ width: "18rem" }} >
          <Card.Body>
            <Card.Title>You're near Work</Card.Title>
            {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
            <Card.Text>Would you like to show your tasks at Work?</Card.Text>
            <Button
              onClick={() => {
                this.props.filterWorkTasks("yes");
              }}
              variant="outline-success"
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                this.props.filterWorkTasks("no");
              }}
              variant="outline-danger"
            >
              No
            </Button>
          </Card.Body>
        </Card>

      </div>
        {/* <Alert show={this.props.toggleShowWorkAlert} variant="success">
        <Alert.Heading>You're near Work</Alert.Heading>
        <p>
          Would you like to show your tasks at Work?
        </p>
        <hr />
        <div className="d-flex justify-content-center align-content-center">
          <Button onClick={()=>{this.props.showWorkAlert("yes")}} variant="outline-success">
            Yes
          </Button>
          <Button onClick={()=>{this.props.showWorkAlert("no")}} variant="outline-red">
            No
          </Button>
        </div>
      </Alert> */}
      </div>
    );
  }
}
