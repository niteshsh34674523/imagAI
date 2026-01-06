// Import React to create a functional component and use JSX
import React from 'react'

// Import stepsData array which contains step title, description, and icon
// This data drives the UI using mapping (dynamic rendering)
import { stepsData } from '../assets/assets'

// Steps component explains how the text-to-image generator works
const Steps = () => {
  return (
    // Main container for steps section
    // flex-col → stack items vertically
    // items-center & justify-center → center content
    // my-32 → vertical spacing from other sections
    <div className='flex flex-col items-center justify-center my-32'>

      {/* Section heading */}
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>
        How it works
      </h1>

      {/* Subheading explaining purpose */}
      <p className='text-lg text-gray-600 mb-8'>
        Transform words into stunning images
      </p>

      {/* Steps container */}
      {/* max-w-3xl → limits width for better readability */}
      {/* space-y-4 → vertical spacing between steps */}
      <div className='space-y-4 w-full max-w-3xl text-sm'>

        {/* Loop over stepsData array to render each step */}
        {stepsData.map((item, index) => (

          // Single step card
          // key → helps React identify list items
          // hover & transition → smooth UI interaction
          <div
            key={index}
            className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg'
          >

            {/* Step icon */}
            <img
              width={40}
              src={item.icon} // Icon representing the step
              alt=""
            />

            {/* Step text content */}
            <div>

              {/* Step title */}
              <h2 className='text-xl font-medium'>
                {item.title}
              </h2>

              {/* Step description */}
              <p className='text-gray-500'>
                {item.description}
              </p>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Export Steps component for use on landing page
export default Steps
