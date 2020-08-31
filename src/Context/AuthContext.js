import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import AuthService from '../Services/AuthService';

// creatng a context
export const AuthContext = createContext();

// we use object destructuring here, where ever if we iport this will give the function name as (AuthProvider)
// this children will be the App component
// pull out children, object destructuring props 
export default ({ children }) => {

    // the data we want to pass to the context using useState method.
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    // To check App is loaded(coz we are going to make a req to the server)
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        // check, if user authenticated using authenticated end-point
        AuthService.isAuthenticated().then(data => {
        // update state using the data what we got from the server 
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            // if user authenticated that mean browser is loaded, we can set it to true.
            setIsLoaded(true);
        });
    },[]);

    return (
        <div>
            {/* set the data what we going to use in the contextApi, inside the provider's value property if browser is loaded. */}
            {!isLoaded ? <Redirect to='/Login'/> :
            <AuthContext.Provider value = {{user, setUser, isAuthenticated, setIsAuthenticated }}>
            {children}
            </AuthContext.Provider>
            }
        </div>

    )

}