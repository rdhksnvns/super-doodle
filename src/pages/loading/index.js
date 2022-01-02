import React, { Component } from 'react';
import './style.css';
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Rkv from '../../assets/img/s.svg';

class Loading extends Component {

  state = {
    redirect: false
  }

  componentDidMount() {
     this.id = setTimeout(() => this.setState({ redirect: true }), 3000);
  }
    
  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render() {
    return this.state.redirect
      ? <Navigate to="/home" />
      : <div>
          <div className="Loading-header">
            <Box id="loaderBox" sx={{ width: '20%', display: 'block' }}>
              <img id="rkv" src={Rkv} alt="rkv" style={{width: "80%", marginBottom: "10%"}} />
              <LinearProgress />
            </Box>
          </div>
        </div>
  }
}

export default Loading;
