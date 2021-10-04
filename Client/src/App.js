import React,{ useContext} from 'react'
import Navbar from './Components/Navbar';
import './App.css';
import Homepage from './Pages/Homepage';
import SinglePage from './Components/SinglePage';
import Write from './Pages/Write';
import Settings from './Pages/Settings';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Context } from "./Context/Context";



function App() {
  //fetching userdata from context
  //user-->This must be same as we are passing from context
  const {user} =  useContext(Context);
  
  return (
    <div className="App">
    <Router>
  <Navbar/>
  <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/posts">
          <Homepage />
        </Route>
        <Route path="/register">
          {user ? <Homepage /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Homepage /> : <Login />}</Route>
        <Route path="/post/:id">
          <SinglePage />
        </Route>
        <Route path="/write">{user ? <Write /> : <Login />}</Route>
        <Route path="/settings">
          {user ? <Settings /> : <Login />}
        </Route>
      </Switch>
  </Router>
    </div>
  );
}

export default App;
