import React from 'react';
//import { Route, Redirect } from "react"
import {Route, Navigate} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
    return (
        <Route
          element = {()=>
            props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />
          }
        />
    )
};

export default ProtectedRoute;
/*import React from 'react';
import { useLocation, Navigate  } from 'react-router-dom'


const ProtectedRoute = ({ сhildren, isChecking}) => {
  const { authed } = useAuth();
  const location = useLocation();
  
    return authed === true 
    ? children : <Navigate to="/sign-in" replacestate={{ path: location.pathname }} />;
}

export default ProtectedRoute;*/