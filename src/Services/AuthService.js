import Axios from "axios";

//creating all the fetch request for end-points
export default {
  register: async (user) => {
    try {
      const { data } = await Axios.post(
        `http://localhost:8080/api/user/register`,
        user
      );
      return data;
    } catch (error) {
      console.log(`Error - AuthService.js - register() - ${error}`);
    }
  },

  login: async (user) => {
    try {
      const { data } = await Axios.post(
        `http://localhost:8080/api/user/login`,
        user
      );
      return data;
    } catch (error) {
      console.log(`Error - AuthService.js - login() - ${error}`);
    }
  },

  // this isAuthenticated function use to persist authentican
  // once user login state in the react app will know user has been authenticated, but when user close the app the state will gone.
  // this function will sinc front-end and back-end and keep user authenticated even react app is closed.
  // so, when user visit the website next time user will still stay login
  //we use context-API to call this function, it is a global state for our react app
  isAuthenticated: async (token) => {
    try {
      const {data } = await Axios({
        method: "post",
        url: `http://localhost:8080/api/user/authenticated`,
        headers: { "x-auth-token": token },
      })
      return data
    } catch (error) {
      console.log(`Error - AuthService.js - isAuthenticated() - ${error}`);
    }
  },

//   getInfo: async (id) => {
//     try {
//       const res = await fetch(`http://localhost:8080/api/user/info/${id}`);
//       if (res.status !== 401) return res.json().then((data) => data);
//       else return console.error("Not Found");
//     } catch (error) {
//       console.log(`Error - AuthService.js - getInfo() - ${error}`);
//     }
//   },
};
