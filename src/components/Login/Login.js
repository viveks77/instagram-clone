import React, {useState} from 'react';
import {connect} from 'react-redux';
import styles from './Login.module.css';
import Logo from '../../assets/logo.png';
import * as actionCreators from '../../store/actions/auth';
import { Redirect, Link } from 'react-router-dom';

const Login = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

   const onAuthHandler = (event) => {
        event.preventDefault();
        props.onAuth(username, password);
    }

    let authRedirect = null;
    if(props.isAuthenticated){
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return(
        <React.Fragment>
        <div className={styles.Wrapper}>
            {authRedirect}
            <div className={styles.Logo}>
                <img src={Logo} alt="" />
            </div>
            <form className={styles.FormField} onSubmit={ event => onAuthHandler(event)}>
                <input type="text" placeholder="Email, Username" onChange={(e) => {setUsername(e.target.value)}}/>
                <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                <input type="submit" placeholder="Log In" value="Log In"/>
            </form>
        </div>
        <div className={styles.Footer}>
                <p>Dont have an account? <Link to="/signup">Sign Up</Link></p>
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
        onAuth : (username, password) => dispatch(actionCreators.auth(username, password))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);