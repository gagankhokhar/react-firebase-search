import React from 'react'
import {Route, Router, IndexRoute, hashHistory} from 'react-router'

import firebase from 'firebaseConf'

import Main from 'Main'
import PlaceList from 'PlaceList'
import Map from 'Map'
import AddPlace from 'AddPlace'
import Person from 'Person'
import ShowPlace from 'ShowPlace'
import EditPlace from 'EditPlace'
import User from 'User'
import Registration from 'Registration'
import Hoc from 'Hoc'
import Preloader from 'Preloader'


const requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/');
  }
  next();
};


const requireLogout = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/');
  }
  next();
};


export default (
  <Router history = {hashHistory}>
    <Route path='/' component={Main}>
      <Route onEnter={requireLogin} path='user' component={User}/>
      <Route path='map' component={Map}/>
      <Route path='add' component={AddPlace}/>
      <Route path='person' component={Person}/>
      <Route path='place/:id' component={ShowPlace}/>
      <Route path='edit/:id' component={EditPlace}/>
      <IndexRoute  component={Hoc(PlaceList, Preloader)}/>
    </Route>
    <Route onEnter={requireLogout} path='registration' component={Registration}/>
    <Route onEnter={requireLogout} path='login' component={Registration}/>
  </Router>
);
