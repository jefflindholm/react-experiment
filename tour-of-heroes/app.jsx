import React from 'react';
import {IndexRedirect, Router, Route, browserHistory} from 'react-router';

import './app.css';
import Main from './container/main';
import Dashboard from './components/dashboard';
import HeroesList from './components/hero-list';
import HeroDetails from './components/hero-details';

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRedirect to="/Dashboard"/>
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/Heroes" component={HeroesList} />
            <Route path="/Hero/:id" component={HeroDetails} />
        </Route>
    </Router>
);
export default routes;
