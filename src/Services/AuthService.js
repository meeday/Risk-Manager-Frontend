//creating all the fetch request for end-points
export default {
    register : user =>{
        return fetch('/user/register', {
            method: "post",
            body: JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
        .then(data => data);
    },

    login : user =>{
        return fetch('/user/login', {
            method: "post",
            body: JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
        .then(data => data);
    },

    logout : () => {
        return fetch('/user/logout')
            .then(res => res.json())
            .then(data => data);
    },
    // this isAuthenticated function use to persist authentican
    // once user login state in the react app will know user has been authenticated, but when user close the app the state will gone.
    // this function will sinc front-end and back-end and keep user authenticated even react app is closed.
    // so, when user visit the website next time user will still stay login
    //we use context-API to call this function, it is a global state for our react app   
    isAuthenticated : () => {
        return fetch ('/user/authenticated')
            .then(res => {
            // passport send 401 status if user not authenticated
                if(res.status !==401)
                return res.json().then(data => data)
                else
                return{isAuthenticated : false, user: {email: ''}}
            })
    }
}