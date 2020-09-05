import { config } from "../config";

// Fetch requests for backend end-points
export default {
    // api/project/... routes
    getProject : async id => {
        try {
            const res = await fetch(`/api/project/${id}`);
            console.log(res);
            return res.json();
        }
        catch (error) {
            console.log(`Error - ProjectService.js - getProject() - ${error}`)
        }
    },
    getAllProjects : async () => {
        try {
            const res = await fetch(`/api/project`)
            return res;
        }
        catch (error) {
            console.log(`Error - ProjectService.js - getAllProjects() - ${error}`)
        }
    },
    createProject : async project => {
        try {
            const res = await fetch(`/api/project`, {
                method: "post",
                body: JSON.stringify(project),
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            return res.json(res);
        }
        catch (error) {
            console.log(`Error - ProjectService.js - createProject() - ${error}`)
        }
    },
    deleteProject : async id => {
        try {
            const res = await fetch(`/api/project/${id}`, {
                method: "delete",
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            return res.json(res);
        }
        catch (error) {
            console.log(`Error - ProjectService.js - deleteProject() - ${error}`)
        }
    },

    // api/project/risk/... routes
    getRisk : async id => {
        try {
            const res = await fetch(`/api/project/risk/${id}`)
            return res.json(res);
        }
        catch (error) {
            console.log(`Error - ProjectService.js - getRisk() - ${error}`)
        }
    },
    createRisk : async newRisk => {
        try {
            const res = await fetch(`/api/project/risk/`, {
                method: "post",
                body: JSON.stringify(newRisk),
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            return res.json(res);
        }
        catch (error) {
            console.log(`Error - ProjectService.js - createRisk() - ${error}`)
        }
    },
    deleteRisk : async id => {
        try {
            const res = await fetch(`/api/project/risk/${id}`, {
                method: "delete",
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            return res.json(res);
        }
        catch (error) {
            console.log(`Error - ProjectService.js - deleteRisk() - ${error}`)
        }
    },
}