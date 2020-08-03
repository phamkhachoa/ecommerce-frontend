import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticated} from './index';

const PrivateRoute = ({component: Comment, ...rest}) => (
    <Route {...rest} render={props => 
        isAuthenticated() ? (<Comment {...props}/>)
        : ( <Redirect to={{pathname: '/signin', state: {from: props.location}}} />)
    } />);

export default PrivateRoute;