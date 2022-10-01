import React, { useState } from 'react'
import { images } from './images/images'

const Slider = () => {

    const [current,setCurrent] = useState(0)
    setTimeout(() => {
        setCurrent(current === images.length -1 ? 0 : current + 1)
    }, 5000)

    const image = () => {
        return images.map(({image} , index) => {
            return(
                <div className={index === current ? 'activeSlide' : 'slide'} key={index}>
                    {index === current && (
                    <img src={image}/>
                )}
                </div>
            )
        })
    }

    return (
        <div className='slider-image'>
            {image()}
        </div>
    )
}

export default Slider
