import { config } from "../config";

// Fetch requests for backend end-points
export default {

    getAllUser : async () => {
        try {
            const res = await fetch(`/api/user`)
            return res.json();
        }
        catch (err) {
            console.log(`Error - UserService.js - getAllUser() - ${err}`)
        }
    }
}