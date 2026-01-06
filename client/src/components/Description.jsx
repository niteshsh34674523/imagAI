// Import React to create a functional component and use JSX syntax
import React from "react";

// Import static assets (images/icons) used in the UI
import { assets } from "../assets/assets";

// Description component shows the intro section of the AI Image Generator
const Description = () => {
  return (
    // Main container: centers content and adds spacing for better UI layout
    <div className="flex flex-col items-center justify-center my-24 p-6 md:px-28">
      {/* Main heading describing the feature of the application */}
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create AI Images
      </h1>

      {/* Subheading explaining the purpose of the tool */}
      <p className="text-gray-500 mb-8">Turn your imagination into visuals</p>

      {/* Wrapper for image + description, responsive for mobile and desktop */}
      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
        {/* Sample AI-generated image for visual preview */}
        <img
          src={assets.sample_img_1} // Static preview image from assets
          className="w-80 xl:w-96 rounded-lg" // Responsive width and rounded corners
          alt="" // Empty alt since image is decorative
        />

        {/* Text content explaining how the AI image generator works */}
        <div>
          {/* Section heading introducing AI functionality */}
          <h2 className="text-2xl font-medium max-w-lg mb-4">
            Introducing the AI-Powered text to image generator
          </h2>

          {/* Explanation of how users convert text prompts into images */}
          <p className="text-gray-600">
            Easily bring your ideas to life with our free AI image generator.
            Whether you need stunning visuals or unique imagery, our tool
            transforms your text into eye-catching images with just a few
            clicks. Imagine it, describe it and watch it come to life instantly.
          </p>

          {/* Brief description of prompt-based image generation */}
          <p className="text-gray-600">
            Simply type in a text promt, and our cutting-edge AI will generate
            hish-quality images in seconds.
          </p>
        </div>
      </div>
    </div>
  );
};

// Export component so it can be used in other parts of the React app
export default Description;
