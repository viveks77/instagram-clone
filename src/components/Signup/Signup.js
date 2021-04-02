import React, {useState} from 'react';
import {connect} from 'react-redux';
import styles from './Signup.module.css';
import Logo from '../../assets/logo.png';
import * as actionCreators from '../../store/actions/auth';
import { Redirect, Link } from 'react-router-dom';

const Signup = (props) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");

   const onAuthHandler = (event) => {
        event.preventDefault();
        const userData = {
            username : username,
            email : email,
            fullname : fullname,
            password : password
        }
        props.onSignup(userData);
    }

    let authRedirect = null;
    if(props.isAuthenticated){
        authRedirect = <Redirect to="/editprofile" />
    }

    return(
        <React.Fragment>
            <div className={styles.Wrapper}>
            {authRedirect}
            <div className={styles.Logo}>
                <img src={Logo} alt="" />
            </div>
            <h4>Sign up to see photos and videos from your friends</h4>
            <form className={styles.FormField} onSubmit={ event => onAuthHandler(event)}>
                <input type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}}/>
                <input type="text" placeholder="Fullname" onChange={(e) => {setFullname(e.target.value)}} />
                <input type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
                <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                <input type="submit" placeholder="Log In" value="Sign Up"/>
            </form>
            <p>By signing up, you agree to our Terms , Data Policy and Cookies Policy </p>
            </div>
            <div className={styles.Footer}>
                <p>Have a account? <Link to="/login">Log in</Link></p>
            </div>
        </React.Fragment>
        
    );
}


const mapStateToProps = (state) => {
    return {
        error : state.auth.error,
        isAuthenticated : state.auth.token !== null,
        authRedirectPath : state.auth.authRedirectPath
    }   
}

const mapDispatchToProps = dispatch => {
    return {
        onSignup : (userData) => dispatch(actionCreators.signUp(userData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Signup);