import React from 'react'
import { HashRouter, Route, Switch} from 'react-router-dom'

import App from './App'
import Login from './page/login/login'
import Home from './page/home/home'


export default class Router extends React.Component{
    render(){
        return (
           <HashRouter>
                <App>
                    <Switch>
                        <Route path='/' component={ Login }></Route>
                        <Route path='/home' component={ Home }></Route>
                    </Switch>
                </App>
           </HashRouter> 
        );
    }
}