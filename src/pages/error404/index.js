import React, { Component } from 'react';
import '../error404/style.css';
import { Link } from "react-router-dom";
import Astronaut from '../../assets/img/astronaut.svg';
import Planet from '../../assets/img/planet.svg';
import particlesJs from '../../assets/const/404_particle.js';
import Particles from "react-tsparticles";

class Error404 extends Component {

  constructor(props) {
    super(props);

    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
  }

  particlesInit(main) {
    console.log(main);
  }

  particlesLoaded(container) {
    console.log(container);
  }

  render() {

    return (
      <div>
        <div className="permission_denied">
          <Particles
            id="tsparticles"
            init={this.particlesInit}
            loaded={this.particlesLoaded}
            options={particlesJs}
          />
          <div className="denied__wrapper">
              <h1 style={{ marginTop: 0 }}>404</h1>
              <h3>LOST IN <span>SPACE</span> superdoodle.rkv.one? Hmm, looks like that page doesn't exist.</h3>
              <img id="astronaut" src={Astronaut} alt="Astronaut"/>
              <img id="planet" src={Planet} alt="Planet" />
            <Link to="/home"><button className="denied__link">Go Home</button></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Error404;
