/* eslint-disable */
import React, { Component } from "react";
import "./styling.css";

// import NavBar from "./navBar";
import { Link } from "react-router-dom";

import { Jumbotron, Button } from "react-bootstrap";

export default class Style extends Component {
  render() {
    return (
      <div>
        {/* <NavBar id="landingMenuSticky" {...this.props}
          logout={this.props.logout}
          setUser={this.props.setUser}
          fetchData={this.props.fetchData}
          setFlashMessage={this.props.setFlashMessage}/> */}

        <div className="landing-home">
          <div className="welcome">
            <h1>To-Do Lists, Tasks, Reminders & more</h1>
            <p>
              Reprogram your brain and automate the important rituals in your
              life so you have more time for what really matters.
            </p>
            <p>
              <Link to="/signup">
                <Button variant="primary btn-prp2">Try it for Free</Button>
              </Link>
            </p>
          </div>

          <div className="bg-img"></div>
        </div>
      </div>
    );
  }
}
