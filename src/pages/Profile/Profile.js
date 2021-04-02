import React from 'react';
import {connect} from 'react-redux';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import styles from './Profile.module.css';
import axios from '../../axios';
import Loader from '../../components/UI/Loader/Loader';
import SuggestedPosts from '../../components/SuggestedPosts/SuggestedPosts';
import Placeholder from '../../components/UI/Placeholder/Placeholder';
import { PostIcon, SavedIcon } from '../../components/UI/Icons';


class Profile extends React.Component{

    state = {
        tabs : "POSTS",
        posts : [],
        savedPosts : [],
    }    

    componentDidMount = async () => {
        await axios.get('/user/me', {
            headers : {"Authorization" : "Bearer " + this.props.token}
        }).then(response => {
            this.setState({
                user : response.data.user,
                posts : response.data.posts,
                savedPosts : response.data.savedPosts
            })
        }).catch(error => {
            console.log(error);
        })
    }

    render(){
        if(!this.state.user){
            return <Loader />;
        }
        return(
            <div>
                <ProfileHeader user={this.state.user}/>
                 <div className={styles.ProfileTab}>
                    <div style={{fontWeight : this.state.tabs === "POSTS" ? "bold" : ""}} 
                    onClick={() => {
                        this.setState({tabs : "POSTS"})
                    }}>
                        <PostIcon /> <span>POSTS</span>
                    </div> 
                    <div style={{fontWeight : this.state.tabs === "SAVED" ? "500" : ""}} 
                    onClick={() => {
                        this.setState({tabs : "SAVED"})
                    }}>
                        <SavedIcon />  <span>SAVED</span>  
                    </div>   
                 </div>
                 {this.state.tabs === "POSTS" && (
                     <div className={styles.Tab}>
                         { this.state.posts.length === 0 ? (
                             <Placeholder title="Posts"
                             text="Once you start making new posts, they'll appear here"
                             icon="post" />
                         ) : (
                            <SuggestedPosts posts={this.state.posts} />
                         )
                         }
                         
                     </div>
                 )}
                 {this.state.tabs === "SAVED" && (
                     <div className={styles.Tab}>
                     { this.state.savedPosts.length === 0 ? (
                             <Placeholder
                             title="Saved"
                             text="Save photos and videos that you want to see again"
                             icon="bookmark"
                           />
                         ) : (
                            <SuggestedPosts posts={this.state.savedPosts} />
                         )
                         }
                 </div>
                 )}           
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token : state.auth.token,
        user : state.auth.user,
    }
}

export default connect(mapStateToProps)(Profile);