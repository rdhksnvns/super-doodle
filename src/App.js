import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
import Loading from './pages/loading';
import Error404 from './pages/error404/index.js';

function App() {
  return (
    <BrowserRouter>
     <Routes>
        <Route exact path="/" element={<Loading />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;