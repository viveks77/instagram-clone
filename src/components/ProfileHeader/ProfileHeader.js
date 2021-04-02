import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Follow from '../../components/UI/Follow/Follow';
import Modal from '../UI/Modal/Modal';
import ShowFollowers from '../ShowFollowers/ShowFollowers';
import ShowFollowings from '../ShowFollowings/ShowFollowings';
import styles from './ProfileHeader.module.css';

const ProfileHeader = (props) => {

    const [showModal, setShowModal] = useState(false); 
    const [tabs, setTab] = useState("FOLLOWER");
    const toggleModalHandler = () => {
        let oldProp = showModal;
        setShowModal(!oldProp);
      }
    const toggleFollowersModal = () => {
        setTab("FOLLOWER");
        setShowModal(true);
    }

    const toggleFollowingModal = () => {
        setTab("FOLLOWING");
        setShowModal(true);
    }

    let profileOptions = null;
    if(props.user.isMe){
        profileOptions = <Link to="/editprofile"><button>Edit profile</button></Link>
    }else if(!props.user.isFollowing){
        profileOptions = <Follow user={props.user.username} />
    }
    console.log(props.user)
    return(
        <div className={styles.Wrapper}>
            <div className={styles.Profile}>
               <img src={"data:image/png;base64," + props.user.avatar} className={styles.Avatar} alt="avatar" />
               <div className={styles.ProfileInfo}>
                   <div className={styles.ProfileMeta}>
                        <h1>{props.user.username}</h1>
                        {profileOptions}
                   </div>
                   <div className={styles.ProfileStats}>
                       <span><strong>{props.user.postCount}</strong> posts</span>
                       <span onClick={toggleFollowersModal} style={{cursor : 'pointer'}}><strong>{props.user.followersCount}</strong> followers</span>
                       <span onClick={toggleFollowingModal} style={{cursor : 'pointer'}}><strong>{props.user.followingCount}</strong> following</span>
                   </div>
                    <div className={styles.ProfileBio}>
                        <h3>{props.user.fullname}</h3>
                        <p>{props.user.bio}</p>
                    </div>
               </div>
            </div>
            <Modal show={showModal} toggleModal={toggleModalHandler}>
                {tabs === "FOLLOWER" && (
                    <ShowFollowers followers={props.user.followers} />
                )}{
                  tabs === "FOLLOWING" && (
                    <ShowFollowings followings={props.user.following} />
                  )  
                }
            </Modal>
        </div>
    );
}

export default ProfileHeader;