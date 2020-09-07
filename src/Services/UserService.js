import { config } from "../config";

// Fetch requests for backend end-points
export default {

    getAllUser : async () => {
        try {
            const res = await fetch(`/api/user`)
            return res;
        }
        catch (err) {
            console.log(`Error - ProjectService.js - getAllUser() - ${err}`)
        }
    }
}