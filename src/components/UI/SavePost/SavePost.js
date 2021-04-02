import React, {useState} from 'react';
import {connect} from 'react-redux';
import axios from '../../../axios';
import { BookmarkIcon, FilledBookmarkIcon } from '../Icons';

const SavePost = ({saved, postId, token}) => {

    const [isSaved, setIsSaved] = useState(saved)

    const handlePostBookmark = async () => {
        await axios.get(`/savepost/${postId}`, {
            headers : {"Authorization" : "Bearer " + token}
        }).then(response => {
            setIsSaved(!isSaved);
        }).catch(error => {
            console.log(error);
        })
    }

    if(isSaved){
        return <FilledBookmarkIcon onClick={handlePostBookmark} />
    }else{
        return <BookmarkIcon onClick={handlePostBookmark}/>
    }

}

const mapStateToProps = state => {
    return {
        token : state.auth.token
    }
}

export default connect(mapStateToProps)(SavePost);