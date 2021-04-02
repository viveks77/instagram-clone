import React from 'react';
import styles from './Editprofile.module.css';
import Profileform from '../../components/Profileform/Profileform';
import axios from '../../axios';
import { logout } from '../../store/actions/auth';
import { connect } from 'react-redux';

class Editprofile extends React.Component{
    
    state = {
        tabs : "EDIT"
    }

    logoutHandler = async () => {
        await axios.get("/user/me/logout", {
            headers : {"Authorization": "Bearer "+ this.props.token}
        }).then(response => {
            this.props.logoutReducer();
            this.props.history.replace("/login");
        }).catch(error => {
            console.log(error);
        });
    }
    
    render(){
        return(
            <div className={styles.Wrapper}>
                <div className={styles.Tabs}>
                    <div style={{borderLeft : this.state.tabs === "EDIT" ? "3px solid #DBDBDB" : "none"}} className={styles.TabsData}>
                        <p onClick={() => this.setState({tabs : "EDIT"})} >Edit Profile</p>
                    </div>
                    {/* <div style={{borderLeft : this.state.tabs === "ACCOUNT" ? "3px solid #DBDBDB" : "none"}} className={styles.TabsData}>
                        <p onClick={() => this.setState({tabs : "ACCOUNT"})} >Account Settings</p>
                    </div> */}
                    <div className={styles.TabsData}>
                        <p onClick={this.logoutHandler}>Logout</p>
                    </div>
                </div>
                <div style={{width : "100%"}}>
                    {this.state.tabs === "EDIT" ? (
                        <Profileform />
                    ) : null}
                    {this.state.tabs === "ACCOUNT" ? (
                        <h1>Account Settings</h1>
                    ) : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token : state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutReducer : () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editprofile);