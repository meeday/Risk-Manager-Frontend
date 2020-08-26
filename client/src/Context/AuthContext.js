import React, { useState, createContext, useEffect } from 'react'
import AuthService from '../Services/AuthService';

export const AuthContext = createContext();

// we use object destructuring here, where ever if we iport this will give the function name as (AuthProvider)
// this children will be the App component
export default ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    // To check App is loaded(coz we are going to make a req to the server)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AuthService.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    },[]);

    return (
        <div>
            {!isLoaded ? <h3>Loading...</h3> :
            <AuthContext.Provider value = {{user, setUser, isAuthenticated, setIsAuthenticated }}>
            {children}
            </AuthContext.Provider>
            }
        </div>

    )

}