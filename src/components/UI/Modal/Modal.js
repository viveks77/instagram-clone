import React from 'react';
import styles from './Modal.module.css';
import BackDrop from '../BackDrop/BackDrop';

const Modal = (props) => {
    return(
        <div style={props.show ? {display : "block"} : {display : "none"}}>
            <BackDrop show={props.show} clicked={props.toggleModal}/>
            <div className={styles.Wrapper} style={props.show ? {opacity : "1"} : {opacity : "0"}}>
            {props.children}
        </div>
        </div>
    )
}

export default Modal;