import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../../store/user/User'
import { useSelector } from 'react-redux'
import {isLoading} from '../../Extensions/React/React'

const Main = ({_id}) => {
    const dispatch = useDispatch()
    const deleteHandler = (link) => {
        const Data = {
            _id: _id,
            post: link
        }
        dispatch(deletePost(Data))
    }

    const {user} = useSelector(state => state)

    const posts = () => {
        return user.users.map(item => {
            return item._id == _id ? (
                item.post.map(link => {
                    return user.isLoading ? (<div style={{display: 'flex',alignItems: 'center',height: '80vh'}}>{isLoading()}</div>) : (
                            <div className="column" key={link}>
                                <img src={link}/>
                                <button className='delete' onClick={() => deleteHandler(link)}>Delete</button>
                                <h1 className='comment'>Morbi consequat lectus non orci maximus</h1>
                            </div>
                        )
                    })
                ) : (null)
        })
    }

    return (
        <div className='main'>
            {user.isLoading ? (isLoading()) : (
                <div className="grid-container">
                    {posts()}
                </div>
            )}
        </div>
    )
}

export default Main