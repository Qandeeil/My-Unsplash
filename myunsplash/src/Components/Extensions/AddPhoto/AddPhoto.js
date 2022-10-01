import React, {useState,useEffect} from 'react'
import { addPost } from '../../../store/user/User';
import { useLocalStorage } from "react-use-storage";
import { useDispatch } from 'react-redux';

const AddPhoto = ({setShowAddPhoto}) => {
    const [userDataStorage,setUserDataStorage] = useLocalStorage('userDataStorage', {})
    const dispatch = useDispatch();
    const changeShowHandler = (e) => {
        e.preventDefault();
        setShowAddPhoto(false)
    }

    const [addUserPost,setAddUserPost] = useState()

    const addPostHandler = (e) => {
        if(addUserPost){
            const post = addUserPost.target.files[0]
            const formData = new FormData()
            formData.append('_id', userDataStorage._id)
            formData.append('uploadPost', post)
            dispatch(addPost(formData))
            setShowAddPhoto(false)
            console.log('clicked')
        }
    }

    return (
        <div className='addPhotoClick'>
            <div className='content'>
                <header>
                    <h1>Add a new photo</h1>
                </header>
                <form>
                    <label>Label</label>
                    <input type='text' placeholder='Suspendisse elit massa'/>
                    <label htmlFor='file'>Add photo</label>
                    <input 
                        type='file' 
                        id='file'
                        onChange={setAddUserPost}
                        accept='image/*'
                    />
                    <div className='button'>
                        <button onClick={changeShowHandler}>Cancel</button>
                        <button onClick={addPostHandler}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPhoto