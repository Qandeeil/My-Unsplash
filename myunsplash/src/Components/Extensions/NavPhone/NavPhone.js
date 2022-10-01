import React, {useState , useEffect} from 'react'
import { UilListUl } from '@iconscout/react-unicons'
import { UilTimesCircle } from '@iconscout/react-unicons'
import { UilSearch } from '@iconscout/react-unicons'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Search } from '../../../store/user/User'

const NavPhone = (
    {
        profilePicture,
        fullName,
        _id,
        setAddProfilePhoto,
        LogoutHandler,
        setShowAddPhoto,
        user
    }) => {
        const dispatch = useDispatch()
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
        <div className='allCountent'>
            <input type='checkbox' id='list'/>
            <label className='list' htmlFor='list'>{<UilListUl size='50px'/>}</label>
            <div className='contentNavPhone'>
                <div className='dataUser'>
                    <label className='close' htmlFor='list'>{<UilTimesCircle size='30px'/>}</label>
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
                        <div className='addPhoto'>
                            <button onClick={() => setShowAddPhoto(true)} >Add a photo</button>
                        </div>
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
        </div>
    )
}

export default NavPhone