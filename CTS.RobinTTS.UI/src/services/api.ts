import axios from "axios";

const API_BASE_URL = "https://localhost:7254/api";  // Make sure it matches your backend port

// Function to test API connection
export const getTestMessage = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/test`);
        return response.data;
    } catch (error) {
        console.error("Error fetching test message:", error);
        return null;
    }
};
