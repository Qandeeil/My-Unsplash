import React, { Fragment, useEffect, useState } from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import { Link, useParams } from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux'
import { getAllDataUser } from '../store/user/User'
import { isLoading } from '../Components/Extensions/React/React'
import { Search } from '../store/user/User'

const Visitor = () => {
    const dispatch = useDispatch()
    let {_id} = useParams();
    const {user} = useSelector(state => state)
    useEffect(() => {
        dispatch(getAllDataUser())
    },[])

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
                                <a href={`/Profiles/${item._id}`}>{item.fullName}</a>
                                <p>{item._id}</p>
                            </div>
                        </div>
                    )
                })
            ) : (null)
        }

    const showDataUser = () => {
        return user.users.map(item => {
            return item._id == _id ? (
                <div>
                    <div className='account'>
                        <div className='dataUser'>
                            <div className='photoProfile'>
                                <img src={item.profilePicture}/>
                            </div>
                            <div className='userName'>
                                <h1>{item.fullName}</h1>
                                <p>{item._id}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (null)
        })
    }

    const posts = () => {
        return user.users.map(item => {
            return item._id == _id ? (
                item.post.map(link => {
                    return(
                        <div className="column" key={link}>
                            <img src={link}/>
                            <h1 className='comment'>Morbi consequat lectus non orci maximus</h1>
                        </div>
                    )
                })
            ) : (null)
        })
    }

    return (
        <div className='visitor'>
            {user.isLoading ? (<div style={{
                display: 'flex',
                height: '100vh',
                alignItems: 'center'
                }}>{isLoading()}</div>) : (
                <Fragment>
                    <div className='headerProfile'>
                        {showDataUser()}
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
                    <div className='main'>
                        <div className="grid-container">
                            {posts()}
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    )
}

export default Visitor