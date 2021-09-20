import React from 'react'
import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import Dogs from './components/Dogs';
import DogDetail from './components/DogDetail';
import NewDog from './components/NewDog';

function App() {
  return (
    <div className="App">
      <Route exact path ="/">
        <LandingPage />
      </Route>

      <Route path="/home">
        <Navbar />
      </Route>

      <Route exact path='/home'>
        <Dogs />
      </Route>

      <Route path='/home/newdog'>
        <NewDog />
      </Route>

      <Route path='/home/detail'>
        <DogDetail />
      </Route>
    </div>
  );
}

export default App;
