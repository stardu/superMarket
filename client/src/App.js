import React from 'react';
import { HashRouter, Route, Switch,BrowserRouter } from 'react-router-dom'
import Login from './page/login/login'
import Home from './page/home/home'

export default class App extends React.Component{
      render(){
        return(
          <BrowserRouter>
              <Switch>
                  <Route path='/' exact component={ Login }></Route>
                  <Route path='/home' component={ Home }></Route>
              </Switch>
          </BrowserRouter>

        )
      }
}
