import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import slider1 from '../../assets/slider1.png'
import slider2 from '../../assets/slider2.png'
import slider3 from '../../assets/slider3.png'


function Slider(){
    const [index, setIndex] = useState(0)

    const mod = (n, m) => {
        let result = n % m;

        return result >= 0 ? result : result + m;
    }

    const cards = [
        {
            id: 1,
            image: slider1,
        },
        {
            id: 2,
            image: slider2,
        },
        {
            id: 3,
            image: slider3,
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setIndex((index + 1) % cards.length)
            }, 6000)
        }, [index])

  return (
    <div className='Slider'>
        <div className='carousel'>
            {cards.map((item, i) => {
                const indexLeft = mod(index - 1, cards.length)
                const indexRight = mod(index + 1, cards.length)

                let className='card'

                if (i === index) {
                    className= 'card card--active'
                } else if (i === indexRight) {
                    className='card card--right'
                } else if (i === indexLeft) {
                    className='card card--left'
                } else className='card'

                return (
                    <>
                        <img
                            key={item.id}
                            className={className}
                            src={item.image}
                            alt="slider"
                        ></img>
                    </>
                    
                )
            })}
        </div>
    </div>
  )
}

export default Slider