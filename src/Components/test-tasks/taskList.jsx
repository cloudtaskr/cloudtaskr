/* eslint-disable */
import React, { Component } from "react";
import Menu from "../Menu/Menu";
import { Button, Container, Row } from "react-bootstrap";
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
// import AddTask from "./addTask";
export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddTaskMenu: false,
      title: "",
      // showDurationAlert: this.props.showDurationAlert
    };
  }

  // filterTasksByTag = tag => {
  //   let tasksCopy = [...this.state.listOfTasks];
  //   let filterTasksByTag = tasksCopy.filter(eachTask => {
  //     return eachTask.title.toLowerCase().includes(tag.toLowerCase());
  //   });

  //   this.setState({
  //     filterTasks: filterTasksByTag
  //   });
  // };
  deleteTask = taskID => {
    console.log(taskID);
    // axios.post(`${baseURL}/api/task/delete/${taskID}`,{withCredentials: true})
    // .then(res=>{
    //   this.props.fetchData()
    //   this.props.history.push("/task");
    // })
  };

  completeTask = taskID => {
    axios
      .post(
        `${baseURL}/api/task/edit/${taskID}`,
        { status: "complete" },
        { withCredentials: true }
      )
      .then(res => {
        console.log(res);
        // this.props.getData();
        // this.setState({ title: "", description: "" });
        this.props.fetchData();
        // this.props.filterList("active");
      })
      .catch(error => console.log(error));
  };

  displayAllTasks = () => {
    // console.log(this.props.filterTaskList)
    let tasks = this.props.filterTaskList || []
    if (tasks.length > 1) {
      return tasks.map(task => {
        // if(task.status==="active"){
        return (
          // console.log(task.lat)
          <Row
            key={task._id}
            name="task"
            // style={{
            //   display: "flex",
            //   padding: "5px",
            //   justifyContent: "space-between"
            // }}
            className="each-task"
          >
            <Col xs={2}>
              {task.status === "complete" ? (<Button
                style={{ margin: "5px" }}
                onClick={() => {
                  this.completeTask(task._id);
                }}
                variant="warning"
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>) : (<Button
                style={{ margin: "5px" }}
                onClick={() => {
                  this.completeTask(task._id);
                }}
                variant="outline-warning"
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>)}

            </Col>
            <Col xs={6} className="task-title" >
              <h5>{task.title}</h5>
            </Col>
            {/* <Col>
          {Math.floor(
                    this.props.distanceFunction(
                      this.props.userLocation.latitude,
                      this.props.userLocation.longitude,
                      task.zone.lat,
                      task.zone.lng,
                      "N"
                    )
                  )}{" "}
                  miles away
          </Col> */}
            <Col xs={4}>
              <Link to={"/task/edit/" + task._id}>
                <Button style={{ margin: "5px" }}>
                  <FontAwesomeIcon icon={faEllipsisV} />
                </Button>
              </Link>

              <Link to={"/task/delete/" + task._id}>
                <Button style={{ margin: "5px" }} variant="danger">
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Link>
            </Col>
          </Row>
        );
        // }
      });
    }
  };

  addTaskMenu = () => {
    // console.log("Add Task Menu");
    window.scrollTo(400, 0);
    this.setState({ showAddTaskMenu: !this.state.showAddTaskMenu });
  };

  // componentDidMount() {
  //   // if (this.props.userObj === "") {
  //   //   return this.props.history.push("/signup");
  //   // } else {
  //     this.displayAllTasks();
  //   // }
  // }

  // notAuthorized = () => {
  //       return this.props.history.push('/signup')
  // }

  render() {
    console.log("Render taskList");

    return (
      <div>
        {/* <Alert show={this.props.showDurationAlert} variant="success">
        <Alert.Heading>How much free time do you have?</Alert.Heading>
        <p>
          Set the number of minutes you're available and we'll recommend tasks for you to complete.
        </p>
        <hr />
        <div className="d-flex justify-content-center align-content-center">
          <Button onClick={()=>{this.props.filterDuration(5)}} variant="outline-success">
            5 mins
          </Button>
          <Button onClick={()=>{this.props.filterDuration(15)}} variant="outline-success">
            15 mins
          </Button>
          <Button onClick={()=>{this.props.filterDuration(30)}} variant="outline-success">
            30 mins
          </Button>
        </div>
      </Alert> */}

        {/* {!this.show && <Button onClick={() => this.setState({showDurationAlert: true})}>Show Alert</Button>} */}
        {this.props.userObj ? (
          <div>

            <Container className="task-list-page">
              {/* {this.props.userObj.firstName ? (
                <h2>Welcome {this.props.userObj.firstName}</h2>
              ) : (
                <h2>Welcome {this.props.userObj.username}</h2>
              )} */}

              <Row style={{ margin: "5px" }}>
                <Col sm={6}>
                  <button
                    onClick={this.addTaskMenu}
                    className="add-task-button"
                  >
                    Add a task
                  </button>
                </Col>
              </Row>

              {/* <button onClick={this.displayAllTasks}>Filter</button> */}
              <Container>
                {/* <Row><Col xs={2}>Complete</Col><Col xs={6}>Task</Col></Row> */}
                {this.state.showAddTaskMenu ? (
                  <Row>
                    <Col>
                      <AddTask
                        fetchData={this.props.fetchData}
                        showAddTaskMenu={this.addTaskMenu}
                        filterList={this.props.filterList}
                      />
                      <hr />
                    </Col>
                  </Row>
                ) : (
                    ""
                  )}
                {this.props && this.displayAllTasks()}
              </Container>

            </Container>
          </div>
        ) : (
            <Container>
              <h1>Not authorized, sign up to make your first task</h1>
              <LinkContainer to="/signup">
                <Button>Sign Up</Button>
              </LinkContainer>
            </Container>
          )}
      </div>
    );
  }
}
