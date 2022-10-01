import React, { Fragment , useRef , useState , useEffect } from 'react'
import google from '../images-social-media/google.svg'
import facebook from '../images-social-media/facebook.svg'
import icloud from '../images-social-media/icloud.svg'
import { Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { verificationError , messageInputError } from '../../Extensions/React/React'
import CompleteSignUp from './CompleteSignUp'
import { checkUsernameSignUp } from '../../../store/user/User'

const SignUp = () => {
    const [errorEmailEmpty,setErrorEmailEmpty] = useState(false)
    const [errorEmailLength,serErrorEmailLength] = useState(false)
    const [errorNameEmpty,setErrorNameEmpty] = useState(false)
    const [errorUsernameEmpty,setErrorUsernameEmpty] = useState(false)
    const [errorPasswordEmpty,setErrorPasswordEmpty] = useState(false)
    const [errorPasswordLength,serErrorPasswordLength] = useState(false)
    const [next,setNext] = useState(false)
    const dispatch = useDispatch();
    const {user} = useSelector(state => state)

    const _id = useRef('')
    const fullName = useRef(null)
    const email = useRef()
    const password = useRef()

    const sendDataHandler = (e) => {
        e.preventDefault();
        const validateEmail = (email) => {
            return email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };

        if(!email.current.value){
            setErrorEmailEmpty(true)
        }else if(email.current.value){
            setErrorEmailEmpty(false)
            if(!validateEmail(email.current.value)){
                serErrorEmailLength(true)
            }else{
                serErrorEmailLength(false)
            }
        }if(!fullName.current.value){
            setErrorNameEmpty(true)
        }else if(fullName.current.value){
            setErrorNameEmpty(false)
        }
        if(!_id.current.value){
            setErrorUsernameEmpty(true)
        }else if(_id.current.value){
            setErrorUsernameEmpty(false)
        }
        if(!password.current.value){
            setErrorPasswordEmpty(true)
        }else if(password.current.value){
            setErrorPasswordEmpty(false)
            if(password.current.value.length < 8){
                serErrorPasswordLength(true)
            }else{
                serErrorPasswordLength(false)
            }
        }
        if(
            email.current.value && 
            fullName.current.value &&
            _id.current.value && 
            password.current.value &&
            validateEmail(email.current.value) &&
            password.current.value.length >= 8 ){
                const data = {
                    _id: _id.current.value
                }
                dispatch(checkUsernameSignUp(data))
            }
    }
    useEffect(() => {
        if(user.checkUsernameSignUp === false){
            setNext(true)
        }
    })
    return (
        <Fragment>
            <div className={next ? ('next-page') : ('signUp signIn')}>
                <div className='content'>
                    <div className='header-signIn'>
                        <div className='logo'>
                            <p>Welcome to <span>Unsplash</span></p>
                            <h1>Sign Up</h1>
                        </div>
                        <div className='newAccount'>
                            <p>Have an Account ?</p>
                            <Link to='/'>Sign in</Link>
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
                            <label>Enter your email address</label>
                            <input 
                                className={
                                    errorEmailEmpty ? 'is-empty-input' : 'is-not-empty-input' &&
                                    errorEmailLength ? 'is-empty-input' : 'is-not-empty-input'
                                } 
                                ref={email} 
                                type='email' 
                                placeholder='Email address'/>
                                {errorEmailEmpty ? (messageInputError('Please enter email address')) : null}
                                {errorEmailLength ? (messageInputError('Please Enter a valid email')) : null}
                        </div>
                        <div className='fullName'>
                            <label>Enter your full name</label>
                            <input 
                                className={errorNameEmpty ? 'is-empty-input' : 'is-not-empty-input'} 
                                ref={fullName} type='email' 
                                placeholder='Full name'/>
                                {errorNameEmpty ? (messageInputError('Please enter your full name')) : null}
                        </div>
                        <div className='username'>
                            <label>Enter your username</label>
                            <input 
                                className={
                                    errorUsernameEmpty ? 'is-empty-input' : 'is-not-empty-input' &&
                                    user.checkUsernameSignUp ? 'is-empty-input' : 'is-not-empty-input'
                                    } 
                                ref={_id} type='username' 
                                placeholder='Username'/>
                                {errorUsernameEmpty ? (messageInputError('Please enter username')) : null}
                        </div>
                        <div className='password'>
                            <label>Enter your Password</label>
                            <input 
                                className={
                                    errorPasswordEmpty ? 'is-empty-input' : 'is-not-empty-input' &&
                                    errorPasswordLength ? 'is-empty-input' : 'is-not-empty-input'
                                    } 
                                ref={password} 
                                type='password' 
                                placeholder='Password'/>
                                {errorPasswordEmpty ? (messageInputError('Please enter password')) : null}
                                {errorPasswordLength ? (messageInputError('Password must be greater than 8 characters')) : null}
                        </div>
                        <div className='button'>
                            <button 
                                className={user.isLoading ? 'buttonLoading' : null} 
                                onClick={sendDataHandler}
                            >Next</button>
                            {user.checkUsernameSignUp ? (verificationError(user.checkUsernameSignUp)) : null}
                        </div>
                    </form>
                </div>
            </div>
            <div>{next ? (<CompleteSignUp 
                                _id = {_id}
                                fullName = {fullName}
                                email = {email}
                                password = {password}
                            />) : ('')}</div>
        </Fragment>
    )
}

export default SignUp