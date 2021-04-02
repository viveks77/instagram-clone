import React from 'react';

import styles from './Backdrop.module.css';

const BackDrop = (props) => (
    props.show ? <div className={styles.Backdrop} onClick={props.clicked}></div> : null
);

export default BackDrop;