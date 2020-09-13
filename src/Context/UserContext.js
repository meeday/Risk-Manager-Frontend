import React, { useState, createContext } from 'react';

// creatng a context
export const UserContext = createContext();

// we use object destructuring here, where ever if we iport this will give the function name as (AuthProvider)
// this children will be the App component
// pull out children, obAuthProviderject destructuring props 
export default ({ children }) => {
    // the data we want to pass to the context using useState method.
    const [userId, setUserId] = useState(null);
    const [userFName, setUserFName] = useState(null);
    const [userLName, setUserLName] = useState(null);
    const [userProjects, setUserProjects] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userRisks, setUserRisks] = useState(null);
    const [userComments, setUserComments] = useState(null);
    const [projects, setProjects] = useState(null);
    
    

    

    return (
        <div>
            {/* set the data what we going to use in the contextApi, inside the provider's value property if browser is loaded. */}            
            <UserContext.Provider 
            value = {{ 
                userId, setUserId,
                userFName, setUserFName,
                userLName, setUserLName,
                userProjects, setUserProjects,
                userEmail, setUserEmail,
                userRisks, setUserRisks,
                userComments, setUserComments,
                projects, setProjects                             
            }}>
            {children}
            </UserContext.Provider>
        </div>

    )

}