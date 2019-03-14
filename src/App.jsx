import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home.jsx';
import Drivers from './components/drivers/Drivers.jsx';
import { connect } from 'react-redux'
import {Link, Route, BrowserRouter, Redirect} from 'react-router-dom';

class AppClass extends Component {
  constructor(props){
    super(props);
    
  }
  
  render() {
    return(
      <div>
      <button>
        <Link to="/home">
          To home
        </Link>
      </button>

      </div>
      
    )
  }
}

const App = connect(
  (state) =>({
    storeState: state.AppReduser
  }),
  (dispatch) => ({
   // setCities:(cities) => dispatch({type:"SET_CITIES",cities:cities})
  })
)(AppClass);

export default App;