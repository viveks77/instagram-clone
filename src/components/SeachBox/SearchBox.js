import React from 'react';
import styles from './SearchBox.module.css';

const SearchBox = (props) => {
    return(
        <form className={styles.SearchBox}>
            <input className={styles.Input} type="text" placeholder="Search" />
        </form>
    );
}

export default SearchBox;