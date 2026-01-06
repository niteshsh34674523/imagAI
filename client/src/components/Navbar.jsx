// Import React and useContext hook
// useContext is used to access global data stored in AppContext
import React, { useContext } from "react";

// Import images/icons used in the navbar UI
import { assets } from "../assets/assets";

// Import Link and useNavigate from react-router-dom
// Link → used for navigation without page reload
// useNavigate → used to navigate programmatically
import { Link, useNavigate } from "react-router-dom";

// Import AppContext to access user authentication and global state
import { AppContext } from "../context/AppContext.jsx";

// Navbar component displayed at the top of the application
const Navbar = () => {
  // Extract global values and functions from AppContext
  // user → logged-in user data (null if not logged in)
  // setShowLogin → function to open login modal
  // logout → function to log out user
  // credit → number of credits user has
  const { user, setShowLogin, logout, credit } = useContext(AppContext);

  // useNavigate returns a function used to change pages
  const navigate = useNavigate();

  return (
    // Main navbar container
    // flex → horizontal layout
    // justify-between → logo on left, actions on right
    // py-4 → vertical padding
    <div className="flex items-center justify-between py-4">
      {/* Logo section */}
      {/* Link is used instead of <a> to avoid page reload */}
      <Link to="/">
        <img
          src={assets.logo} // App logo
          alt=""
          className="w-28 sm:w-32 lg:w-40" // Responsive logo size
        />
      </Link>

      {/* Right side of navbar */}
      <div>
        {/* If user is logged in */}
        {user ? (
          // Container for logged-in user actions
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Credit button */}
            {/* Navigates user to buy credits page */}
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
            >
              <img src={assets.credit_star} alt="" />
              <p className="text-xs sm:text-sm font-medium">
                Credit left : {credit}
              </p>
            </button>

            {/* Greeting message */}
            {/* Hidden on small screens */}
            <p className="text-gray-600 max-sm:hidden pl-4">Hi, {user.name}</p>

            {/* Profile icon with dropdown */}
            {/* group is used for hover effect */}
            <div className="relative group">
              {/* Profile icon */}
              <img
                src={assets.profile_icon}
                className="w-10 drop-shadow"
                alt=""
              />

              {/* Dropdown menu */}
              {/* Hidden by default, shown on hover */}
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li
                    onClick={logout} // Logs out the user
                    className="py-1 px-2 cursor-pointer pr-10"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          // If user is NOT logged in
          <div className="flex items-center gap-2 sm:gap-5">
            {/* Pricing link */}
            <p onClick={() => navigate("/buy")} className="cursor-pointer">
              Pricing
            </p>

            {/* Login button */}
            {/* Opens login modal */}
            <button
              onClick={() => setShowLogin(true)}
              className="bg-zinc-800 text-white cursor-pointer px-7 py-2 sm:px-10 text-sm rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Export Navbar component
export default Navbar;
