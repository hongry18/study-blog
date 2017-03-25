import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// import containers
import { App, Home, Login, Register } from './containers';

const el = document.getElementById('root');

ReactDOM.render(
    <Router history={browserHistory} >
        <Route path='/' component={App} >
            <IndexRoute component={Home} />
            <Route path='login' component={Login} />
            <Route path='register' component={Register} />
        </Route>
    </Router>, el
);
