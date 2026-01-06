// Import React and useContext hook
// useContext allows this component to read global data
import React, { useContext } from 'react'

// Import images and icons used in the header UI
import { assets } from '../assets/assets'

// Import AppContext which stores global application state
// (example: logged-in user, login popup control)
import { AppContext } from '../context/AppContext.jsx'

// Import useNavigate to move between pages without page reload
import { useNavigate } from 'react-router-dom'

// Header component shown at the top of the landing page
const Header = () => {

  // Read global data from AppContext
  // user → holds logged-in user information (null if not logged in)
  // setShowLogin → function to open login modal
  const { user, setShowLogin } = useContext(AppContext)

  // useNavigate gives a function to change routes programmatically
  // navigate('/result') will move user to result page
  const navigate = useNavigate()

  // Function runs when "Generate Images" button is clicked
  const onClickHandler = () => {

    // Check if user is logged in
    if (user) {

      // If logged in, go to image generation result page
      navigate('/result')

    } else {

      // If not logged in, open login popup
      setShowLogin(true)
    }
  }

  return (
    // Main header container
    // flex-col → items stacked vertically
    // justify-center & items-center → center content
    // text-center → center text
    // my-20 → margin top and bottom
    <div className='flex flex-col justify-center items-center text-center my-20'>

      {/* Small badge showing feature highlight */}
      {/* inline-flex → content fits width */}
      {/* gap-2 → space between text and icon */}
      <div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>
        <p>Best text to image generator</p>

        {/* Star icon next to badge text */}
        <img src={assets.star_icon} alt="" />
      </div>

      {/* Main heading of the application */}
      {/* Responsive text size for different screens */}
      <h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>
        Turn text to <span className='text-blue-600'>image</span> in seconds
      </h1>

      {/* Short description explaining what the app does */}
      <p className='text-center max-w-xl mx-auto mt-5'>
        Unleash your creativity with AI. Turn your imagination into visual art in seconds-
        just type, and watch the magic happen
      </p>

      {/* Button that starts the image generation flow */}
      {/* onClick checks login and navigates accordingly */}
      <button
        onClick={onClickHandler}
        className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
      >
        Generate Images

        {/* Decorative star icon inside button */}
        <img className='h-6' src={assets.star_group} alt="" />
      </button>

      {/* Sample generated images preview section */}
      {/* flex-wrap allows images to move to next line on small screens */}
      <div className='flex flex-wrap justify-center mt-16 gap-3'>

        {/* Create an array of 6 items and loop over it */}
        {/* Used to show sample AI-generated images */}
        {Array(6).fill('').map((item, index) => (

          // Display alternating sample images
          <img
            key={index} // key helps React track list items
            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
            alt=""
            width={70}
            className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
          />
        ))}
      </div>

      {/* Caption below sample images */}
      <p className='mt-2 text-neutral-600'>
        Generated images from imagify
      </p>

    </div>
  )
}

// Export Header component for use in Home/Landing page
export default Header
