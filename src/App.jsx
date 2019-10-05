import React, { useState, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Router, Route, Redirect, Switch } from "react-router-dom";
import LoginComponent from './components/auth/login';
import { history } from './_helpers';
import { MainComponent } from './components/main.component';
import { PrivateRoute } from './components/private-routes';
import { connect } from 'react-redux';
import HomePage from './components/HomePage';
import SideBar from './components/sidebar/SideBar';
import Content from './components/content/Content';
const SecretRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('user')
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

export default () => {
  const [isOpen, setOpen] = useState(true)
  const toggle = () => setOpen(!isOpen)
  const user = localStorage.getItem('user');
  return (
    <Router history={history}>
      {/* <Switch> */}
      <div className="App wrapper">
        {/* <SecretRoute exact path="/" toggle={toggle} isOpen={isOpen} component={SideBar} >
        </SecretRoute>
        <SecretRoute exact path="/" toggle={toggle} isOpen={isOpen} component={Content} >
        </SecretRoute> */}
        {/* <SecretRoute exact path="/" component={HomePage} >
          </SecretRoute> */}
        
        <SideBar toggle={toggle} isOpen={isOpen} />
        <Content toggle={toggle} isOpen={isOpen} />
        <Route exact path="/login" component={LoginComponent} />
      </div>
      {/* </Switch> */}
    </Router>
  );
}

