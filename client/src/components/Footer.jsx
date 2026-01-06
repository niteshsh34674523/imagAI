// React is required to create a functional component and use JSX
import React from "react";

// Assets file contains logo and social media icons used in the footer
import { assets } from "../assets/assets";

// Footer component shown at the bottom of the application
const Footer = () => {
  return (
    // Main footer container
    // flex → places items in a row
    // items-center → vertically centers all items
    // justify-between → pushes first item left, last item right, space in between
    // gap-4 → spacing between child elements
    // py-3 → vertical padding for better height
    // mt-20 → pushes footer away from main content
    <div className="flex items-center justify-between gap-4 py-3 mt-20">
      {/* Logo section */}
      {/* Shows branding of the AI image generator */}
      <img
        src={assets.logo} // Logo image from assets
        width={150} // Fixed width for consistent UI
        alt=""
      />

      {/* Copyright text */}
      {/* flex-1 → takes remaining space between logo and icons */}
      {/* border-l → vertical separator line */}
      {/* max-sm:hidden → hides text on small screens */}
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        Copyright @niteshsh34.dev | All rights reserved.
      </p>

      {/* Social media icons container */}
      {/* Used for brand presence and user trust */}
      <div>
        <img
          src={assets.facebook_icon} // Facebook icon
          alt=""
          width={35}
        />
        <img
          src={assets.twitter_icon} // Twitter icon
          alt=""
          width={35}
        />
        <img
          src={assets.instagram_icon} // Instagram icon
          alt=""
          width={35}
        />
      </div>
    </div>
  );
};

// Export Footer so it can be reused in layouts and pages
export default Footer;
