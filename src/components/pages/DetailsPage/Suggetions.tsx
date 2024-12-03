import React from 'react'
import AllProducts from '../Shop/AllProducts'

export default function Suggetions() {
  return (
    <div className='border-t py-4'>
        <h1 className='text-center text-4xl font-outfit '>You may also like</h1>
        <AllProducts/>
    </div>
  )
}
