import React, {useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUser } from '../../../store/user/User'
import { isLoading , isErrorInternet } from '../../Extensions/React/React'

const User = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUser())
    },[])
    const {user} = useSelector(state => state)
    const mapUsers = () => {
        return user.isLoading ? (isLoading()) : (
            user.isError ? (
                <div className='allUser'>
                    {isErrorInternet('You must first run the server to download the server, please go to the following link:')}
                </div>
            ) : (
                user.users.map(({_id,profilePicture,fullName,createAt}) => {
                    return(
                        <div className='user' key={_id}>
                            <img src={profilePicture}/>
                            <Link to={`/Profiles/${_id}`} target='_blank'>{fullName}</Link>
                            <p>{createAt}</p>
                        </div>
                    )
                })
            )
        )
    }
    return (
        <div className='users'>
            <div className='text'>
                <h1>Login as</h1>
            </div>
            <div className='allUser'>
                {mapUsers()}
            </div>
        </div>
    )
}

export default User