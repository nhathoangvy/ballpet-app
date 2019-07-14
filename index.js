import React from 'react'
import { render } from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './router/App'
import Login from './router/Login'
import Home from './router/Home'
import Register from './router/Register'
import Change from './router/Change'
import Histories from './router/History'
import Posts from './router/Posts'
import Post from './router/Post'
import Redux from './router/redux'
import todoApp from './reducer/redux'
import Inbox from './router/Inbox'
import Withdraw from './router/Withdraw'
import Update from './router/Update'
import Rank from './router/Rank'

let store = createStore(todoApp)

let rootElement = document.getElementById('app')

import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router'
  /*  <Provider store = {store}>
      <App />
   </Provider> */

render(
   <Provider store={store}>
    <Router history={browserHistory}>
    <Route path="/login" component={Login} />
    <Route path="/" component={App} />
    <Route path="/matches" component={Histories} />
    <Route path="/register" component={Register} />
    <Route path="/change" component={Change} />
    <Route path="/inbox" component={Inbox} />
    <Route path="/update" component={Update} />
    <Route path="/redux" component={Redux} />
    <Route path="/posts" component={Posts}/>
    <Route path="/posts/:id" component={Post}/>
    <Route path="/ranking" component={Rank} />
  </Router>
  </Provider>,
	
   rootElement
)