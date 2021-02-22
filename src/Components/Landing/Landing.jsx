// Components
/* eslint-disable */
import React from "react";
import Menu from "../Menu/Menu";

// Custom Components
import BackgroundWithOverlay from "../BackgroundWithOverlay/BackgroundWithOverlay";

// Styling
import { Jumbotron, Button, Card, CardDeck } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Landing.css";

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("Render Landing");
    console.log("I am Kadus");
    return (
      <>
        {/* HERO, landing page background image */}
        <BackgroundWithOverlay
          imgUrl="estee-janssens-2enBTsIVhUU-unsplash.jpg"
          alpha=".6"
        />

        {/* welcome statement */}
        <Jumbotron className="hero-container">
          <h1 className="landing-title">
            Get more done in your day with cloudTaskr
          </h1>
          <div>
            <LinkContainer to="/signup">
              <Button>Get Started</Button>
            </LinkContainer>
          </div>
        </Jumbotron>




        


        {/* navbar */}
        {/* <Menu
          id="landingMenuSticky"
          {...this.props}
          logout={this.props.logout}
          setUser={this.props.setUser}
          fetchData={this.props.fetchData}
          setFlashMessage={this.props.setFlashMessage}
        /> */}

        {/* Section 1 */}
        <section className="landingWhat">
          <h3>What does cloudTaskr do?</h3>
        </section>



        {/* Section 2 */}
        <section className="landingHow">
          <h3>How does cloudTaskr work?</h3>
        </section>
        {/* Section 3 */}
        <section className="landingCall">
          <h3>Call to Action</h3>
        </section>
        {/* Footer */}
        <footer className="landingFooter">
          <h3>Footer content</h3>
        </footer>
      </>
    );
  }
}
