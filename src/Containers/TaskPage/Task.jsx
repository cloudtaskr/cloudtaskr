import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faHome,
  faBriefcase,
  faPlus,
  faCloud
} from "@fortawesome/free-solid-svg-icons";

// Project Components
import Menu from "../../Components/Menu/Menu";
// import TaskList from "../../Containers/TaskPage/TaskList";
import TaskList from "../../Components/test-tasks/taskList"
// import AddTaskModal from "../../Components/test-tasks/addTaskModal";

// Styling
import "../../Components/Task/Task.css";
// import { LinkContainer } from "react-router-bootstrap";

export default class Task extends Component {
  state = {
    allTasks: [],
    displayedTasks: [],
    targetName: "task"
  };

  checkForTasks = e => {
    let tasks;
    let count = this.props.filterTaskList.length;

    if (count > 0) {
      tasks = this.props.filterTaskList;
    } else {
      tasks = [];
    }

    let targetName = e.target.getAttribute("name");

    this.setState({ allTasks: [...tasks], targetName: targetName }, () => {
      this.updateView();
    });
  };

  updateView = () => {
    let view = this.state.targetName;
    let display;

    switch (view) {
      case "task":
        display = this.state.allTasks;
        break;
      default:
        display = [];
    }

    this.setState({ displayedTasks: [...display] });
  };

  render() {
    return (
      <>
        <Menu
          id="landingMenuSticky"
          {...this.props}
          logout={this.props.logout}
          setUser={this.props.setUser}
          fetchData={this.props.fetchData}
        />
        <div id="task-page">
          <aside id="task-sidebar">
            <Container>
              <h2 className="sidebar-header">Sections</h2>
              <ul className="fa-ul">
                <li>
                  <h4
                    name="task"
                    className="sidebar-item"
                    onClick={this.checkForTasks}
                  >
                    <FontAwesomeIcon icon={faCloud} listItem />
                    Tasks
                  </h4>
                </li>
                <li>
                  <h4
                    name="inbox"
                    className="sidebar-item"
                    onClick={this.checkForTasks}
                  >
                    <FontAwesomeIcon icon={faInbox} listItem />
                    Inbox
                  </h4>
                </li>
              </ul>

              <h3 className="sidebar-header">Zones</h3>

              <ul className="fa-ul">
                <li>
                  <h4
                    name="home"
                    className="sidebar-item"
                    onClick={this.checkForTasks}
                  >
                    <FontAwesomeIcon icon={faHome} listItem />
                    Home
                  </h4>
                </li>
                <li>
                  <h4
                    name="work"
                    className="sidebar-item"
                    onClick={this.checkForTasks}
                  >
                    <FontAwesomeIcon icon={faBriefcase} listItem />
                    Work
                  </h4>
                </li>
              </ul>

              <h3 className="sidebar-header">Tags</h3>
              <Button id="add-task">
                <h3>
                  <FontAwesomeIcon icon={faPlus} />
                </h3>
              </Button>
            </Container>
          </aside>

          <section id="task-section">
            <TaskList
              {...this.props}
              viewableTasks={this.state.displayedTasks}
              // viewableTasks={this.props.filterTaskList}
              fetchData={this.props.fetchData}
                  userLocation={this.props.userLocation}
                  distanceFunction={this.props.distanceFunction}

            />
          </section>
          
        </div>
      </>
    );
  }
}
