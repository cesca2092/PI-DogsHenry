import React from 'react'
import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import Dogs from './components/Dogs';

function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>

      <Route exact path ="/">
        <LandingPage />
      </Route>

      <Route path="/home">
        <Navbar />
        <Dogs />
      </Route>
    </div>
  );
}

export default App;
