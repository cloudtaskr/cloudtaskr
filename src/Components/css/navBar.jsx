/* eslint-disable */
import React, { Component } from 'react'
import "./navBar.css"

import {Link} from "react-router-dom"
// import SearchBox from "../search-box/searchBox"

import { Button } from "react-bootstrap";

import Axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import baseURL from "../../services/base";

// Custom Components
import LoginForm from "../LoginForm/LoginForm";

// Styles
import { Navbar, Nav } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTasks,
  faSignOutAlt,
  faWalking
} from "@fortawesome/free-solid-svg-icons";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      hideButton: false
    };
  }
  render() {
    return (
      <div className="container-fluid nav-style">

        <div className="nav-left">
          <Link to="/">
            <img className="logo" src="./images/logo.png" alt="logo" />
          </Link>
        </div>

        <div className="nav-middle">
        </div>

        <div className="nav-right">
        

        {this.props.userObj ? 
        (<>
          <Link to="/task" className="nav-heading nav-heading2">Dashboard</Link>
          <Link to="/" className="nav-heading">
            <Button variant="primary btn-prp" onClick={this.props.logout}>Log out</Button>
          </Link>
          <Link to="/account" className="nav-heading profile-css">
          <FontAwesomeIcon icon={faUser} />{" "}
          </Link>
          </>) : (<>
            <Link to="/" className="nav-heading nav-heading2">Home</Link>
          <Link to="/login" className="nav-heading">
            <Button variant="primary btn-prp">Login</Button>
          </Link>
          <Link to="/signup" className="nav-heading">
            <Button variant="primary btn-prp">Sign up</Button>
          </Link>
          </>)}
        
        </div>

      </div>
    )
  }
}
