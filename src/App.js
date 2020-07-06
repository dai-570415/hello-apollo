import React from 'react';
import './assets/css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './components/Index';
import GitApolo from './components/GitApolo/Index';

const App = () => {
  return (
    <div className="container">
      <Router>
        <main>
          <Switch>
            <Route exact path="/" component={ Index } />
            <Route exact path="/git" component={ GitApolo } />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
