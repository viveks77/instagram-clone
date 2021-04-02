import React, { useState } from 'react';
import {HeartIcon, FilledHeartIcon} from '../Icons';
import axios from '../../../axios';
import {connect} from 'react-redux';

const LikePost = ({isLiked, token, likeDec, likeInc, postId}) => {
    
    const [likeState, setLikeState]  = useState(isLiked);

    const onClickHandler = async () => {
        const url = `/post/toggleLike/${postId}`;
        if(likeState){
            setLikeState(false);
            likeDec();
            await axios.get(url, {
                headers : {'Authorization' : "Bearer " + token}
            }).then(response => {
               
            }).catch(error => {
                setLikeState(true);
                likeInc();
            })
        }else{
            setLikeState(true);
            likeInc();
            await axios.get(url, {
                headers : {'Authorization' : "Bearer " + token}
            }).then(response => {
                
            })
              .catch(error => {
                  setLikeState(false);
                  likeDec();
              })
        }
    }

    if(likeState){
        return <FilledHeartIcon onClick={onClickHandler} />
    }

    if(!likeState){
        return <HeartIcon onClick={onClickHandler} />
    }
}

const mapStateToProps = (state) => {
    return {
        token : state.auth.token
    }
}

export default connect(mapStateToProps, null)(LikePost);