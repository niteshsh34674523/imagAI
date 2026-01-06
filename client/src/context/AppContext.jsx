// Import createContext and useState from React
// createContext → creates a GLOBAL data container (shared across app)
// useState → stores data that can change over time
import { createContext, useState } from "react";

// toast is used to show popup messages (errors / success) to the user
// Example: "Login failed", "Credits exhausted"
import { toast } from "react-toastify";

// axios is a library used to send HTTP requests to backend APIs
// It handles GET, POST, headers, body, etc.
import axios from "axios";

// useEffect is used to run side-effects
// Example: API calls, subscriptions, syncing data
import { useEffect } from "react";

// useNavigate is used to change routes (pages) programmatically
// Example: redirect user to /buy page
import { useNavigate } from "react-router-dom";

// Create AppContext
// This is a GLOBAL STORE that any component can access
// Similar to a centralized memory for the app
export const AppContext = createContext();

// AppContextProvider is a wrapper component
// It PROVIDES global data to all child components
const AppContextProvider = (props) => {

  // user → stores logged-in user details
  // null means user is NOT logged in
  const [user, setUser] = useState(null);

  // showLogin → controls whether login modal is visible
  // true → show login popup
  // false → hide login popup
  const [showLogin, setShowLogin] = useState(false);

  // token → stores JWT authentication token
  // localStorage.getItem("token") keeps user logged in after refresh
  const [token, setToken] = useState(localStorage.getItem("token"));

  // credit → stores how many image generation credits user has
  const [credit, setCredit] = useState(0);

  // backendUrl → base URL of backend server
  // All API requests use this base URL
  const backendUrl = "https://imagai-mizg.onrender.com";

  // useNavigate returns a function to redirect users
  const navigate = useNavigate();

  // loadCreditsData function
  // This function:
  // 1. Sends request to backend
  // 2. Fetches user details and credit balance
  // 3. Updates frontend state
  const loadCreditsData = async (authToken = token) => {
    try {
      // axios.get → sends GET request to backend
      const { data } = await axios.get(
        backendUrl + "/api/user/credits",
        {
          headers: {
            // Authorization header
            // Bearer token is standard JWT authentication format
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // If backend response indicates success
      if (data.success) {

        // Update credit balance in frontend
        setCredit(data.credits);

        // Update logged-in user data
        setUser(data.user);
      }
    } catch (error) {

      // Log error in console for debugging
      console.log(error);

      // Show error message to user
      toast.error(error.message);
    }
  };

  // generateImage function
  // Sends text prompt to backend AI service
  // Backend generates image and returns image URL
  const generateImage = async (prompt) => {
    try {
      // axios.post → sends POST request to backend
      const { data } = await axios.post(
        backendUrl + "/api/image/generate-image",
        {
          prompt, // Text prompt entered by user
        },
        {
          headers: {
            // Token is required to authorize image generation
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If image generation is successful
      if (data.success) {

        // Reload credits because one credit is consumed
        loadCreditsData();

        // Return generated image URL to frontend component
        return data.resultImage;

      } else {

        // Show backend error message
        toast.error(data.message);

        // Reload credits to sync frontend state
        loadCreditsData();

        // If user has no credits left
        if (data.creditBalance === 0) {

          // Redirect user to buy credits page
          navigate("/buy");
        }
      }
    } catch (error) {

      // Handle network or server errors
      toast.error(error.message);
    }
  };

  // logout function
  // Clears entire user session
  const logout = () => {

    // Remove token from browser storage
    localStorage.removeItem("token");

    // Clear token from state
    setToken("");

    // Remove user data from state
    setUser(null);

    // Reset credits to zero
    setCredit(0);
  };

  // useEffect runs automatically when token changes
  // Example: after login or page refresh
  useEffect(() => {

    // If token exists, user is authenticated
    if (token) {

      // Load user data and credits
      loadCreditsData();
    }
  }, [token]); // Dependency array → runs when token value changes

  // value object
  // Contains ALL global data and functions
  // Any component using useContext(AppContext) can access these
  const value = {
    user,            // Logged-in user info
    setUser,         // Update user info
    showLogin,       // Login modal visibility
    setShowLogin,    // Toggle login modal
    backendUrl,      // Backend base URL
    token,           // JWT token
    setToken,        // Update token
    credit,          // Credit balance
    setCredit,       // Update credit balance
    loadCreditsData, // Fetch credits from backend
    logout,          // Logout function
    generateImage,   // AI image generation function
  };

  // AppContext.Provider makes global data available
  // props.children means ALL components wrapped inside provider
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

// Export provider so it can wrap the app in main.jsx
export default AppContextProvider;
