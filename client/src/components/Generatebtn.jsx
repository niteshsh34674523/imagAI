import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'

const Generatebtn = () => {
  const {user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler =()=>{
    if(user){
      navigate('/result')
    }else{
      setShowLogin(true)
    }
  }
  return (
    <div className='pb-16 text-center'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>See the magic, try now</h1>
      <button onClick = {onClickHandler} className='inline-flex items-center gap-2 text-white bg-black m-auto px-12 py-3 hover:scale-105 transition-all duration-500  rounded-full'>Generate Images
              <img className='h-6 ' src={assets.star_group} alt="" />
            </button>
    </div>
  )
}

export default Generatebtn
