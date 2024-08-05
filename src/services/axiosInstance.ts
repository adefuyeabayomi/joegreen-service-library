import axios from 'axios';
import axiosRetry from 'axios-retry';

// Define your production and local URLs
const productionURL = "https://joegreen-express-server.onrender.com";
const localURL = "http://localhost:8080";

// Function to check if the application is running locally
function backendUrl() {
  console.log({LOCATION: window.location.hostname})
  const hostname = window.location.hostname;
  return hostname === "localhost" || hostname === "127.0.0.1" ? localURL : productionURL;
}

console.log(backendUrl())
// Create an axios instance with the appropriate baseURL
const axiosInstance = axios.create({
  baseURL: backendUrl(),
  timeout: 30000, // Set a timeout of 30 seconds
  headers: {
    "Content-Type": "application/json" // Set the content type to JSON
  }
});
axiosRetry(axiosInstance,{retries: 3})

export default axiosInstance;
