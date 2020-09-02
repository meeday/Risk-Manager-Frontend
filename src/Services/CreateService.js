export default {
    CreateProject : user =>{
        return fetch('/user/newproject', {
            method: "post",
            body: JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
    }
}