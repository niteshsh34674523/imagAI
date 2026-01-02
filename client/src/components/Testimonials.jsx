import React from 'react'
import { assets, testimonialsData } from '../assets/assets'

const Testinomials = () => {
  return (
       <div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Customer testimonials</h1>
      <p className='text-gray-500 mb-12'>What our users are saying</p>

      <div className='flex flex-wrap gap-6'>
        {testimonialsData.map((testimonail,index)=>(
          <div key = {index} className='bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all'>
            <div>
            <img src={testimonail.image} className="rounded-full w-14" alt="" />
            <h2 className='text-gray-500 mb-1'>{testimonail.name}</h2>
            <p className='flex mb-1'>{testimonail.role}</p>
            <div className='flex mb-1'>
              {Array(testimonail.stars).fill().map((item,index)=>(
                <img key = {index} src={assets.rating_star} alt="" />
              ))}
            </div>
            <p className='text-center text-sm text-gray-600'>{testimonail.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testinomials
