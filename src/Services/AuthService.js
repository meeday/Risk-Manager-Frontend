// import { config } from "../config";

//creating all the fetch request for end-points
export default {
  register: async (user) => {
    try {
      const res = await fetch(`/api/user/register`, {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.json();
    } catch (error) {
      console.log(`Error - AuthService.js - register() - ${error}`);
    }
  },

  login: async (user) => {
    try {
      const res = await fetch(`/api/user/login`, {
        method: "post",
        credentials: "include",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { email: "" } };
    } catch (error) {
      console.log(`Error - AuthService.js - login() - ${error}`);
    }
  },

  logout: async () => {
    try {
      const res = await fetch(`/api/user/logout`);
      return res.json();
    } catch (error) {
      console.log(`Error - AuthService.js - logout() - ${error}`);
    }
  },
  // this isAuthenticated function use to persist authentican
  // once user login state in the react app will know user has been authenticated, but when user close the app the state will gone.
  // this function will sinc front-end and back-end and keep user authenticated even react app is closed.
  // so, when user visit the website next time user will still stay login
  //we use context-API to call this function, it is a global state for our react app
  isAuthenticated: async () => {
    try {
      const res = await fetch(`/api/user/authenticated`);
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { email: "" } };
    } catch (error) {
      console.log(`Error - AuthService.js - isAuthenticated() - ${error}`);
=======
      return res.json();
    } catch (error) {
      console.log(`Error - AuthService.js - login() - ${error}`);
    }
  },

  logout: async () => {
    try {
      const res = await fetch(`/api/user/logout`);
      return res.json();
    } catch (error) {
      console.log(`Error - AuthService.js - logout() - ${error}`);
    }
  },
  // this isAuthenticated function use to persist authentican
  // once user login state in the react app will know user has been authenticated, but when user close the app the state will gone.
  // this function will sinc front-end and back-end and keep user authenticated even react app is closed.
  // so, when user visit the website next time user will still stay login
  //we use context-API to call this function, it is a global state for our react app
  isAuthenticated: async () => {
    try {
      const res = await fetch(`/api/user/authenticated`);
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { email: "" } };
    } catch (error) {
      console.log(`Error - AuthService.js - isAuthenticated() - ${error}`);
    }
  },

  getInfo: async (id) => {
    try {
      const res = await fetch(`/api/user/info/${id}`);
      if (res.status !== 401) return res.json().then((data) => data);
      else return console.error("Not Found");
    } catch (error) {
      console.log(`Error - AuthService.js - getInfo() - ${error}`);
    }
  },
};
