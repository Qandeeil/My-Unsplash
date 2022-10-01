import React, { useState , useRef , useEffect } from 'react'
import { Link } from 'react-router-dom'
import Country from '../../Extensions/Country/Country'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { addUser } from '../../../store/user/User'
import { useDispatch , useSelector} from 'react-redux'
import { messageInputError } from '../../Extensions/React/React'

const CompleteSignUp = ({_id,fullName,email,password}) => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state)
    const [errorCountryEmpty,setErrorCountryEmpty] = useState(false)
    const [errorBirthdayEmpty,setErrorBirthdayEmpty] = useState(false)
    const [errorGenderEmpty,setErrorGenderEmpty] = useState(false)
    const [valuePhoneNumber, setValuePhoneNumber] = useState()
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const country = useRef()
    const birthday = useRef()
    const gender = useRef()

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

    const updateUserHandler = (e) => {
        e.preventDefault()
        if(country.current.value === 'none'){
            setErrorCountryEmpty(true)
        }else{
            setErrorCountryEmpty(false)
        }
        if(birthday.current.value){
            setErrorBirthdayEmpty(false)
        }else{
            setErrorBirthdayEmpty(true)
        }
        if(gender.current.value === 'none'){
            setErrorGenderEmpty(true)
        }else{
            setErrorGenderEmpty(false)
        }
        if(country.current.value !== 'none' &&
            birthday.current.value && 
            gender.current.value !== 'none'){
                const formData = new FormData()
                formData.append('_id', _id.current.value)
                formData.append('email', email.current.value)
                formData.append('password', password.current.value)
                formData.append('uploadProfilePicture', selectedFile)
                formData.append('fullName', fullName.current.value)
                formData.append('country', country.current.value)
                formData.append('phoneNumber', valuePhoneNumber)
                formData.append('birthday', birthday.current.value)
                formData.append('gender', gender.current.value)
                dispatch(addUser(formData))
                window.location = '/'
            }
    }

    return (
        <div className='completeSignUp signIn'>
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
                <form>
                    <div className='addphoto'>
                        {selectedFile &&  <img className='preview' src={preview} /> }
                        <input 
                            name='profilePicture' 
                            type='file' 
                            accept='image/*' 
                            id='image'
                            onChange={onSelectFile}
                        />    
                        <label 
                            className='images' 
                            htmlFor='image'
                        >{selectedFile ? 'Change image' : 'Choose image'}</label>
                    </div>
                    <div className='country'>
                        <label>Enter your Country</label>
                        {<Country 
                            country = {country}
                            errorCountryEmpty = {errorCountryEmpty}
                        />}
                        {errorCountryEmpty ? messageInputError('Please select your country') : null}
                    </div>
                    <div className='phoneNumber'>
                        <label>Enter your Phone Number</label>
                        <PhoneInput
                            className='phone'
                            placeholder="phone number"
                            value={valuePhoneNumber}
                            onChange={setValuePhoneNumber}
                        />
                    </div>
                    <div className='flex'>
                        <div className='birthday'>
                            <label>Enter your birthday</label>
                            <input 
                                ref={birthday} 
                                type='date'/>
                                {errorBirthdayEmpty ? messageInputError('Please select your birthday') : null}
                        </div>
                        <div className='gender'>
                            <label>Enter your Gender</label>
                            <select ref={gender}>
                                <option value='none'>Select gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                            {errorGenderEmpty ? messageInputError('Please select your gender') : null}
                        </div>
                    </div>
                    <div className='button'>
                        <button 
                            className={user.isLoading ? 'buttonLoading' : null} 
                            onClick={updateUserHandler}>Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompleteSignUp