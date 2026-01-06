// Import React and required hooks
// useState → store form data and UI state
// useContext → access global app data
// useEffect → run side effects when component mounts/unmounts
import React, { useContext, useEffect, useState } from "react";

// Import icons and images used in the login UI
import { assets } from "../assets/assets";

// Import AppContext to access global state like backend URL, user, token
import { AppContext } from "../context/AppContext.jsx";

// Axios is used to send HTTP requests to backend (login/register)
import axios from "axios";

// Toast is used to show success/error popup messages
import { toast } from "react-toastify";

// Login component handles both Login and Sign Up
const Login = () => {
  // state → decides whether form is Login or Sign Up
  const [state, setState] = useState("Login");

  // Extract global values and functions from AppContext
  // setShowLogin → close login modal
  // backendUrl → base URL of backend server
  // setToken → save JWT token in global state
  // setUser → save logged-in user info
  // loadCreditsData → fetch user credits after login
  const { setShowLogin, backendUrl, setToken, setUser, loadCreditsData } =
    useContext(AppContext);

  // Local state to store form input values
  const [name, setName] = useState(""); // User name (used in Sign Up)
  const [email, setEmail] = useState(""); // User email
  const [password, setPassword] = useState(""); // User password

  // Function runs when form is submitted
  const onSubmitHandler = async (e) => {
    // Prevent page reload on form submit
    e.preventDefault();

    try {
      // If current mode is Login
      if (state === "Login") {
        // Send login request to backend with email and password
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        // If backend returns success
        if (data.success) {
          // Save token and user in global state
          setToken(data.token);
          setUser(data.user);

          // Store token in browser localStorage for persistence
          localStorage.setItem("token", data.token);

          // Load user credits using token
          await loadCreditsData(data.token);

          // Close login modal
          setShowLogin(false);
        } else {
          // Show backend error message
          toast.error(data.message);
        }
      } else {
        // If current mode is Sign Up

        // Send registration request to backend
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        // If registration is successful
        if (data.success) {
          // Save token and user globally
          setToken(data.token);
          setUser(data.user);

          // Store token in localStorage
          localStorage.setItem("token", data.token);

          // Load credits for new user
          await loadCreditsData(data.token);

          // Close login modal
          setShowLogin(false);
        } else {
          // Show error if registration fails
          toast.error(data.message);
        }
      }
    } catch (error) {
      // Handle network or server errors
      toast.error(error.message);
    }
  };

  // useEffect runs once when component mounts
  useEffect(() => {
    // Disable background scrolling when login modal is open
    document.body.style.overflow = "hidden";

    // Cleanup function runs when component unmounts
    return () => {
      // Enable scrolling again
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    // Full screen overlay for login modal
    // fixed → covers entire screen
    // backdrop-blur → blur background
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      {/* Login / Sign Up form */}
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-5 rounded-xl text-slate-500"
      >
        {/* Form heading changes based on state */}
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>

        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {/* Name input shown only during Sign Up */}
        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img width={30} src={assets.profile_icon} alt="" />
            <input
              onChange={(e) => setName(e.target.value)} // Update name state
              value={name}
              type="text"
              className="outline-none text-sm"
              placeholder="Full name"
              required
            />
          </div>
        )}

        {/* Email input field */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-2">
          <img width={15} src={assets.email_icon} alt="" />
          <input
            onChange={(e) => setEmail(e.target.value)} // Update email state
            value={email}
            type="email"
            className="outline-none text-sm"
            placeholder="Enter Email"
            required
          />
        </div>

        {/* Password input field */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-2">
          <img width={15} src={assets.lock_icon} alt="" />
          <input
            onChange={(e) => setPassword(e.target.value)} // Update password state
            value={password}
            type="password"
            className="outline-none text-sm"
            placeholder="Enter Password"
            required
          />
        </div>

        {/* Forgot password text (UI only) */}
        <p className="text-sm text-blue-600 my-2 cursor-pointer">
          Forgot password
        </p>

        {/* Submit button text changes based on mode */}
        <button className="bg-blue-600 w-full text-white py-2 cursor-pointer rounded-full">
          {state === "Login" ? "Login" : "Create account"}
        </button>

        {/* Toggle between Login and Sign Up */}
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setState("Sign Up")} // Switch to Sign Up mode
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setState("Login")} // Switch back to Login mode
            >
              {" "}
              Login
            </span>
          </p>
        )}

        {/* Close icon to close login modal */}
        <img
          onClick={() => setShowLogin(false)} // Close modal
          src={assets.cross_icon}
          className="absolute top-5 right-5 cursor-pointer"
          alt=""
        />
      </form>
    </div>
  );
};

// Export Login component
export default Login;
