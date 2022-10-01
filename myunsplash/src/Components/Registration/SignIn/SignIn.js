import React, { useRef, useEffect, useState, Component } from 'react'
import google from '../images-social-media/google.svg'
import facebook from '../images-social-media/facebook.svg'
import icloud from '../images-social-media/icloud.svg'
import { Link } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import { useLocalStorage } from "react-use-storage";
import { checkUserLogin } from '../../../store/user/User'
import { messageInputError, verificationError} from '../../Extensions/React/React'

const SignIn = () => {

    const [errorUsernameEmpty,setErrorUsernameEmpty] = useState(false)
    const [errorPasswordEmpty,setErrorPasswordEmpty] = useState(false)
    const [errorConnection,setErrorConnection] = useState(false)
    const [isLogin,setIsLogin] = useLocalStorage('isLogin', false)
    const [userDataStorage,setUserDataStorage] = useLocalStorage('userDataStorage', {})   
    const {user} = useSelector(state => state)
    const dispatch = useDispatch();
    const _id = useRef()
    const password = useRef()
    const checkUserHandler = (e) => {
        e.preventDefault();
        if(!_id.current.value){
            setErrorUsernameEmpty(true)
        }else{
            setErrorUsernameEmpty(false)
        }
        if(!password.current.value){
            setErrorPasswordEmpty(true)
        }else{
            setErrorPasswordEmpty(false)
        }
        if(
            _id.current.value && 
            password.current.value){
                if(user.isError){
                    setErrorConnection(true)
                }else{
                    const data = {
                        _id: _id.current.value,
                        password: password.current.value
                    }
                    dispatch(checkUserLogin(data))
                }
        }
    }
    useEffect(() => {
        if(user.isLogin.result){
            setIsLogin(true)
            setUserDataStorage(user.isLogin.data)
        }
        if(isLogin){
            const id = userDataStorage._id
            window.location = `/Profile/${id}`
        }
    })
    useEffect(() => {
        if(!isLogin){
            setUserDataStorage(null)
        }
    },[])

    return (
        <div className='signIn'>
            <div className='content'>
                <div className='header-signIn'>
                    <div className='logo'>
                        <p>Welcome to <span>Unsplash</span></p>
                        <h1>Sign in</h1>
                    </div>
                    <div className='newAccount'>
                        <p>No Account ?</p>
                        <Link to='/SignUp'>Sign up</Link>
                    </div>
                </div>
                <div className='signWith'>
                    <div className='google'>
                        <img src={google}/>
                        <span>Sign with Google</span>
                    </div>
                    <div className='facebook'>
                        <img src={facebook}/>
                    </div>
                    <div className='icloud'>
                        <img src={icloud} />
                    </div>
                </div>
                <form>
                    <div className='email'>
                        <label>Enter your username or email address</label>
                        <input
                            className={errorUsernameEmpty ? 'is-empty-input' : 'is-not-empty-input'}
                            ref={_id} 
                            type='text' 
                            placeholder='Username or email address'/>
                            {errorUsernameEmpty ? (messageInputError('Please enter username')) : null}
                    </div>
                    <div className='password'>
                        <label>Enter your Password</label>
                        <input 
                            className={errorPasswordEmpty ? 'is-empty-input' : 'is-not-empty-input'} 
                            ref={password} 
                            type='password' 
                            placeholder='Password'/>
                            {errorPasswordEmpty ? (messageInputError('Please enter password')) : null}
                    </div>
                    <div className='Forgot'>
                        <p>Forgot Password</p>
                    </div>
                    <div className='button'>
                        <button 
                            className={user.isLoading ? 'buttonLoading' : null} 
                            onClick={checkUserHandler}
                        >Sign in</button>
                        {errorConnection ? verificationError('Please check your connection the internet') : (null)}
                        {verificationError(user.isLogin.message)}
                    </div>
                </form>
            </div>
        </div>
    )
}
export default SignIn