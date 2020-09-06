import dotenv from "dotenv";
// Configure dotenv to get access to environment variables
dotenv.config();

export const config = { 
    API_URL: process.env.REACT_APP_API_URL,
    GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
};