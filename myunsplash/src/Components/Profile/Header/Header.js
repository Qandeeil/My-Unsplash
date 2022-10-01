import React, {Fragment, useEffect, useState} from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import { useDispatch , useSelector } from 'react-redux'
import { updatePhotoProfile } from '../../../store/user/User'
import AddPhoto from '../../Extensions/AddPhoto/AddPhoto'
import NavPhone from '../../Extensions/NavPhone/NavPhone'
import { Search } from '../../../store/user/User'
import { Link } from 'react-router-dom'

const Header = ({LogoutHandler,_id,fullName,profilePicture}) => {
    const [showAddPhoto,setShowAddPhoto] = useState(false)
    const dispatch = useDispatch()
    const [addProfilePhoto,setAddProfilePhoto] = useState()
    if(addProfilePhoto){
        const file = addProfilePhoto.target.files[0]
        const formData = new FormData()
        formData.append('uploadProfilePicture', file)
        formData.append('_id', _id)
        dispatch(updatePhotoProfile(formData))
    }
    const {user} = useSelector(state => state)
    const [search,setSearch] = useState()

    useEffect(() => {
        dispatch(Search(search))
    }, [search])

    const showUsers = () => {
        return search ? (
            user.filter.map(item => {
                return(
                    <div className='person' key={item._id}>
                        <div className='imagePerson'>
                            <img src={item.profilePicture}/>
                        </div>
                        <div className='dataPerson'>
                            <Link to={`/Profiles/${item._id}`} target='_blank'>{item.fullName}</Link>
                            <p>{item._id}</p>
                        </div>
                    </div>
                )
            })
        ) : (null)
    }

    return (
        <Fragment>
            <div className={showAddPhoto ? '' : 'hide'}>
                {<AddPhoto 
                    setShowAddPhoto = {setShowAddPhoto}
                />}
            </div>
            <div className='headerProfile'>
                <div className='account'>
                    <div className='dataUser'>
                        <div className='photoProfile'>
                            <img src={profilePicture}/>
                        </div>
                        <div className='userName'>
                            <h1>{fullName}</h1>
                            <p>{_id}</p>
                        </div>
                    </div>
                    <nav>
                        <ul>
                            <input type='file' id='image' accept='image/*' onChange={setAddProfilePhoto}/>
                            <label htmlFor='image' >Edit photo profile</label>
                            <li onClick={LogoutHandler}>Sign Out</li>
                        </ul>
                    </nav>
                </div>
                <div className='search'>
                    {<UilSearch />}
                    <input onChange={(e) => setSearch(e.target.value)} type="search" placeholder='Search by name'/>
                    {search ? (
                        <div className='searchUser'>
                            {showUsers()}
                        </div>
                    ) : (null)}
                </div>
                <div className='addPhoto'>
                    <button onClick={() => setShowAddPhoto(true)} >Add a photo</button>
                </div>
            </div>
            <div className='navPhone'>
                {<NavPhone 
                    profilePicture = {profilePicture}
                    fullName = {fullName}
                    _id = {_id}
                    setAddProfilePhoto = {setAddProfilePhoto}
                    LogoutHandler = {LogoutHandler}
                    setShowAddPhoto = {setShowAddPhoto}
                    user = {user}
                />}
            </div>
        </Fragment>
    )
}

export default Header