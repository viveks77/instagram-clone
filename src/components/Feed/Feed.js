import React from 'react';
import Post from '../Post/Post';
import Nopost from '../NoPosts/Noposts';

const Feed = ({data}) => {
    
    let post = null;
    if(data){
        if(data.length === 0){
           post = <Nopost /> 
        }else{ 
            post = data.map(post => {
                return <Post key={post._id} data={post} />
            }) 
        }
    }
    return(
        <div style={{marginTop : "10px" ,marginLeft : "20px"}}>
            {post}
        </div>
    );
}


export default Feed;