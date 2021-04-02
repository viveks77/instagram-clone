import React, { useState } from 'react';
import styles from './Profileform.module.css';
import {connect} from 'react-redux';
import axios from '../../axios';
import {updateUserSuccess, updateUserFail} from '../../store/actions/auth';
import { useHistory } from 'react-router';

const Editprofile = (props) => {
    
    const [username, setUsername] = useState(props.user.username);
    const [fullname, setFullname] = useState(props.user.fullname); 
    const [bio, setBio] = useState("");
    const [avatarImg, setAvatarImg] = useState(props.user.avatar);
    const [avatar, setAvatar] = useState(null);
    const history = useHistory();
    

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const form = new FormData();
        form.append("avatar", avatar);
        form.append("fullname", fullname);
        form.append("bio", bio);

        await axios.post('/user/update', form, {
            headers : {"Content-Type": "multipart/form-data",
                        "Authorization": "Bearer " + props.token }
        }).then(response => {
            props.userUpdateSuccess(response.data);
            navigateForward();
        }).catch(error => {
            props.userUpdateFail(error.response);
        });
       
    }

    const navigateForward = () => {
        console.log(navigateForward);
        history.push({
            pathname : '/profile'
        })
    }

    const onAvatarChangeHandler = (event) => {
        if (event.target.files[0]) {
            setAvatar(event.target.files[0]);
            const reader = new FileReader();
            reader.onload = (e) => {
              setAvatarImg(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
          }
    }

    return(
        <div className={styles.Wrapper}>
            <form onSubmit={onSubmitHandler} className={styles.FormGroup}>
                <div className={styles.InputAvatar}>
                    <img src={avatarImg} alt=""/>
                <div className={styles.InputUser}>
                    <p><strong>{props.user.username}</strong></p>
                    <div className={styles.InputFile}>
                    <label>Change profile picture</label>
                    <input onChange={onAvatarChangeHandler} type="file" accept="image/*"/>
                    </div>
                </div>
                </div>
                <div className={styles.InputGroup}>
                    <label>Username</label>
                    <input style={{border: "none", fontWeight: "bold", fontSize: "large"}} placeholder={username} value={username} onChange={(e) => setUsername(e.target.value)} disabled={true} />
                </div>
                <div className={styles.InputGroup}>
                    <label>Fullname</label>
                    <input placeholder={fullname} value={fullname} onChange={(e) => setFullname(e.target.value)}/>
                </div>
                <div className={styles.InputGroup}>
                    <label>Bio</label>
                    <input placeholder="Bio" onChange={(e) => setBio(e.target.value)}/>
                </div>
                <input type="submit" value="Save Changes" />
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user : state.auth.user,
        token : state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userUpdateSuccess : (user) => dispatch(updateUserSuccess(user)),
        userUpdateFail : (error) => dispatch(updateUserFail(error))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editprofile);