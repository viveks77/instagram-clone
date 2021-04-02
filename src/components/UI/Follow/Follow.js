import React, { useState } from 'react';
import {connect} from 'react-redux';
import axios from '../../../axios';
import {fetchFeed} from '../../../store/actions/feed';


const Follow = ({user, token, feedUpdate}) => {

    const [isFollowing, setIsFollowing] = useState(false);

    const style = {
        color : "#0095F6",
        outline : "none",
        border : 'none',
        background : 'transparent',
        fontSize : '0.9rem',
        fontWeight : 'bold',
        cursor : "pointer"
    }
    const followUserHandler = async () => {

        let url = "/user/" + (isFollowing ? "unfollow" : "follow");

        const data = JSON.stringify({'username': user});
        await axios.post(url, data, {
            headers : {'Authorization' : 'Bearer ' + token}
        }).then(response => {
            setIsFollowing(!isFollowing);
            //feedUpdate(token)
        }).catch(error => {
            console.log(error);
        })
    }

    let button = null;
    if(isFollowing){
        button = <button onClick={followUserHandler} style={style}>Unfollow</button>
    }
    
    if(!isFollowing){
        button = <button onClick={followUserHandler} style={style}>Follow</button>
    }

    return(
        <React.Fragment>
            {button}
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        token : state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        feedUpdate : (token) => dispatch(fetchFeed(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Follow);