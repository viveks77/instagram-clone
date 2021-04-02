import React from 'react';

const Avatar = ({imgSrc, altSrc}) => {
    
    const style={
        maxWidth : "38px",
        height : "38px",
        objectFit : "cover",
        borderRadius : "50%",
    }
    
    return(
        <img style={style} alt={""} src={imgSrc} />
    )
}

export default Avatar;