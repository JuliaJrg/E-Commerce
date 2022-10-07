import React from 'react'
import Home from '../components/Home/Home'
import Slider from '../components/Home/Slider'
import Services from '../components/Home/Services'


export const HomePage = () => {
  return (
      <div>
          <Home />
          <Slider />
          <Services />
          {/* <Contact /> */}
      </div>
  )
}

export default HomePage