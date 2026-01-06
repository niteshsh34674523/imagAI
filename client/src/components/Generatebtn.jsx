// Import React and the useContext hook
// useContext is used to read data from a global storage (Context)
import React, { useContext } from 'react'

// Import images/icons used in this component
import { assets } from '../assets/assets'

// Import AppContext which stores global app data like logged-in user
import { AppContext } from '../context/AppContext.jsx'

// Import useNavigate hook from react-router-dom
// useNavigate is used to move from one page to another without reloading
import { useNavigate } from 'react-router-dom'

// Generate button component
const Generatebtn = () => {

  // useContext(AppContext) reads data stored in AppContext
  // user → contains logged-in user info (null if not logged in)
  // setShowLogin → function to open login popup
  const { user, setShowLogin } = useContext(AppContext)

  // useNavigate returns a function used to change routes/pages
  // navigate('/result') means go to /result page
  const navigate = useNavigate()

  // Function runs when user clicks the Generate Images button
  const onClickHandler = () => {

    // Check if user is logged in
    // If user exists, it means authentication is done
    if (user) {

      // Navigate user to the result page where images are generated
      navigate('/result')

    } else {

      // If user is not logged in, open the login modal
      setShowLogin(true)
    }
  }

  return (
    // Container for heading and button
    // text-center → center text
    // pb-16 → padding bottom for spacing
    <div className='pb-16 text-center'>

      {/* Heading shown above the generate button */}
      <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>
        See the magic, try now
      </h1>

      {/* Button that starts image generation flow */}
      {/* onClick triggers authentication check */}
      <button
        onClick={onClickHandler}
        className='inline-flex items-center gap-2 text-white bg-black m-auto px-12 py-3 hover:scale-105 transition-all duration-500 rounded-full'
      >
        Generate Images

        {/* Icon inside the button for better UI */}
        <img
          className='h-6'
          src={assets.star_group}
          alt=""
        />
      </button>

    </div>
  )
}

// Export component so it can be used on home page
export default Generatebtn
