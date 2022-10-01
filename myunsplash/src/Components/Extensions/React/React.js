import React from 'react'


export const isLoading = () => {
    return (
        <span className="loader"></span>
    )
}


export const isErrorInternet = (message) => {
    return(
        <div className="disable-internet">
            <span>{message}</span>
            <br />
            <a href='https://github.com/Qandeeil/My-Unsplash' target='_blank'>https://github.com/Qandeeil/My-Unsplash</a>
        </div>
    )
}


export const verificationError = (error) => {
    return(
        error ? (
            <div className="verification-error">
                <span>Error: </span>{error}
            </div>
        ) : null
    )
}

export const messageInputError = (textError) => {
    return(
        <p 
            className='message-input-error'
        >{textError}</p>
    )
}