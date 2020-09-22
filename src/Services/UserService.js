import { config } from "../config";

// Fetch requests for backend end-points
export default {

    getAllUser : async () => {
        try {
            const res = await fetch(`https://risk-manager-jmni-backend.herokuapp.com/api/user`)
            return res.json();
        }
        catch (err) {
            console.log(`Error - UserService.js - getAllUser() - ${err}`)
        }
    }
}