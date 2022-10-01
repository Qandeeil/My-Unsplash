import React from 'react'
import image from './images/logo.svg'

const Cover = () => {
    return (
        <div className='header'>
            <div className='logo'>
                <h1>My Unsplash</h1>
            </div>
            <div className='about'>
                <div className='text'>
                    <h1>Sign in to</h1>
                    <h2>My Unsplash</h2>
                    <p>
                    Lorem Ipsum is simply dummy 
                    text of the printing and typesetting 
                    industry. Lorem Ipsum has been the industry's 
                    standard dummy text ever since the 1500s,
                    </p>
                </div>
                <div className='image'>
                    <img src={image}/>
                </div>
            </div>
        </div>
    )
}

export default Cover