import { config } from "../config";

// Fetch requests for backend end-points
export default {

    getAllUser : async () => {
        try {
            const res = await fetch(`https://risk-manager-backend.herokuapp.com/api/user/allUser`)
            return res.json();
        }
        catch (err) {
            console.log(`Error - UserService.js - getAllUser() - ${err}`)
        }
    }
}