import React, {Fragment, useEffect} from 'react'
import Header from '../Components/Profile/Header/Header';
import Main from '../Components/Profile/Main/Main';
import { useLocalStorage } from "react-use-storage";
import { getAllDataUser } from '../store/user/User';
import { useDispatch } from 'react-redux';

const AppProfile = () => {
    const [isLogin,setIsLogin] = useLocalStorage('isLogin', false)
    const [userDataStorage,setUserDataStorage] = useLocalStorage('userDataStorage', {})
    const LogoutHandler = () => {
        setIsLogin(false)
        window.location = '/'
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllDataUser())
    },[])
    return (
        <Fragment>
            {<Header 
                isLogin = {isLogin}
                LogoutHandler = {LogoutHandler}
                _id = {userDataStorage._id}
                fullName = {userDataStorage.fullName}
                profilePicture = {userDataStorage.profilePicture}
            />}
            {<Main
                _id = {userDataStorage._id}
            />}
        </Fragment>
    )
}

export default AppProfile