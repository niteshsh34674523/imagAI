// Import React to allow creation of a functional component using JSX syntax
// JSX lets us write HTML-like code inside JavaScript
import React from 'react'

// Import:
// assets → contains icons like rating stars
// testimonialsData → array of testimonial objects (name, role, stars, text, image)
import { assets, testimonialsData } from '../assets/assets'

// Testimonials component
// This component displays feedback from users who used the AI image generator
const Testinomials = () => {
  return (
    // Main wrapper for the testimonials section
    // flex flex-col → stack items vertically
    // items-center justify-center → center content horizontally and vertically
    // my-24 → margin on top and bottom to separate from other sections
    // p-6 md:px-28 → padding for mobile and larger screens
    <div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>

      {/* Main heading of testimonials section */}
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>
        Customer testimonials
      </h1>

      {/* Subheading explaining what this section shows */}
      <p className='text-gray-500 mb-12'>
        What our users are saying
      </p>

      {/* Container that holds all testimonial cards */}
      {/* flex-wrap → allows cards to move to next line on smaller screens */}
      {/* gap-6 → spacing between cards */}
      <div className='flex flex-wrap gap-6'>

        {/* Loop through testimonialsData array */}
        {/* map() is used to dynamically create UI from data */}
        {testimonialsData.map((testimonail, index) => (

          // Single testimonial card
          // key → required by React to uniquely identify list items
          // bg-white/20 → transparent white background
          // shadow-md & border → card-like appearance
          // hover:scale → small zoom effect on hover
          <div
            key={index}
            className='bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all'
          >

            {/* Inner wrapper for testimonial content */}
            <div>

              {/* User profile image */}
              {/* rounded-full → circular image */}
              {/* w-14 → fixed width */}
              <img
                src={testimonail.image} // Image URL from testimonial data
                className="rounded-full w-14"
                alt=""
              />

              {/* User name */}
              {/* Displayed below profile image */}
              <h2 className='text-gray-500 mb-1'>
                {testimonail.name}
              </h2>

              {/* User role or designation */}
              {/* Example: Designer, Developer, Student */}
              <p className='flex mb-1'>
                {testimonail.role}
              </p>

              {/* Rating stars section */}
              {/* Array(testimonail.stars) creates an array of length equal to stars */}
              {/* fill() fills it so map() can iterate */}
              <div className='flex mb-1'>
                {Array(testimonail.stars).fill().map((item, index) => (

                  // Single star icon
                  // key → required for React list rendering
                  <img
                    key={index}
                    src={assets.rating_star} // Star icon image
                    alt=""
                  />
                ))}
              </div>

              {/* Testimonial text */}
              {/* This is the actual feedback from the user */}
              <p className='text-center text-sm text-gray-600'>
                {testimonail.text}
              </p>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Export Testimonials component so it can be used on Home/Landing page
export default Testinomials
