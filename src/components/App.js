import React from 'react';
import './App.css';
import {Router, Route} from 'react-router-dom';
import history from '../history';
import Login from './login';
import NotesRedux from './notesRedux';
// import Notes from './notes';

function App() {
  return (
    <div className="App">
      <h1>Notes App</h1>
      <Router history={history}>
        <Route exact path = "/" component={Login} />
        <Route exact path ="/notes" component={NotesRedux} />
        {/* <Route exact path = "/notes" component={Notes} /> */}
      </Router>
    </div>
  );
}

export default App;
