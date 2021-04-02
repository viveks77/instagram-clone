import React from 'react';
import {Link} from 'react-router-dom';
import navlogo from '../../assets/navlogo.png';
import styles from './Navbar.module.css';
import SearchBox from '../SeachBox/SearchBox'
import { HomeIcon, ExploreIcon, NewPostIcon } from '../UI/Icons';

const Navbar = (props) => {

    return(
        <header className={styles.Navbar}>
            <div className={styles.Nav}>
                <div className={styles.Logo}>
                    <Link to="/"><img src={navlogo} alt="" /> </Link>
                </div>
                <SearchBox />
                <div className={styles.NavLinks}>
                    <Link to="/"><HomeIcon /></Link>
                    <Link to="/explore"><ExploreIcon /></Link>
                    <Link to="/newpost" ><NewPostIcon /></Link>
                    <Link to="/profile">
                        <img style={{width : '25px', height : '25px', objectFit: 'cover', borderRadius : '12px'}} src={props.user.avatar} alt="username" />
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Navbar;