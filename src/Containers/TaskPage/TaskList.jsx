/* eslint-disable */
/* eslint-disable */
import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";

// Custom Components
import Welcome from "../../Components/Messages/Welcome";
import ShowTasks from "../../Components/Task/ShowTasks";
import AddTask from "../../Components/test-tasks/addTask"

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddButton: false,
      // tasks: []
    };
  }

  toogleTaskMenu = () => {
    this.setState({ 
      showAddButton: !this.state.showAddButton 
    });
  }

  // componentDidMount() {
    // this.setState({ tasks: this.props.viewableTasks });
  // }

  render() {
    return (
      <Container>
        <Welcome {...this.props} />
        <Button onClick={this.toogleTaskMenu}>Add Task</Button>
        {this.state.showAddButton ? (
          <AddTask fetchData={this.props.fetchData} showAddTaskMenu={this.toogleTaskMenu}/>
        ) : (
          ""
        )}

        <ShowTasks tasks={this.props.viewableTasks} />
      </Container>
    );
  }
}
