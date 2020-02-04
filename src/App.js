import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { Department } from './components/Department';
import { Employee } from './components/Employee';


import './App.css';
import { Navigation } from './components/Navigation';

function App () {
  return (
    <BrowserRouter>
      <div className="container">

        <h3 className="m-3 d-flex justify-content-center">React JS Web api demo</h3>
        <h5 className="m-3 d-flex justify-content-center">Employee Management Portal</h5>

        <Navigation />

        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/department' component={Department} />
          <Route path='/employee' component={Employee} />
        </Switch>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
