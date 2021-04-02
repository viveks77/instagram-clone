import React from 'react';
import styles from './Suggestions.module.css';
import UserCard from '../UI/UserCard/UserCard';
import Follow from '../UI/Follow/Follow';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

const Suggestions = ({suggestions, user}) => {
    
    const history = useHistory();
    let userCards = null;
    let suggestionCards = null;
    const userRedirectHandler = (username) => {
        console.log(username);
        history.push(`/user/${username}`);
    }

    if(suggestions.length > 0){
        userCards = suggestions.map(user => {
            return (
                <div  key={user._id} className={styles.SuggestionsCards}>
                    <UserCard clicked={() => userRedirectHandler(user.username)} user={user} altSrc="Username" />
                    <Follow user={user.username} />
                </div>
            )    
        })
        suggestionCards = (<>
                            <h4>Suggestions for you.</h4>
                        {userCards} 
                            </>)
    }else{
        suggestionCards = (
            <h5>We currently cant find any users to suggest</h5>
        )
    }
    return(
       <div className={styles.Wrapper}>
           <div className={styles.Suggestions}>
                <UserCard user={user} altSrc="Username" />
                <div className={styles.SuggestionsWrapper}>
                {suggestionCards}
                </div>
           </div>
       </div>
    );
}

const mapStateToProps = state => {
    return {
        suggestions : state.homepage.suggestions,
        user : state.auth.user,
    }
}

export default connect(mapStateToProps, null)(Suggestions);