import axios from 'axios';

// Define your production and local URLs
const productionURL = "https://joegreen-express-server.onrender.com";
const localURL = "http://localhost:8080";

// Function to check if the application is running locally
function isLocalhost() {
  const hostname = window.location.hostname;
  return hostname === "localhost" || hostname === "127.0.0.1";
}

// Create an axios instance with the appropriate baseURL
const axiosInstance = axios.create({
  baseURL: isLocalhost() ? localURL : productionURL,
  timeout: 1000, // Set a timeout of 1 second
  headers: {
    "Content-Type": "application/json" // Set the content type to JSON
  }
});

export default axiosInstance;
