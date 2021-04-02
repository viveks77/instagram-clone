import React from 'react';
import Placeholder from '../UI/Placeholder/Placeholder';
import styles from './Noposts.module.css';

const Nopost = (props) => {
    return(
        <div className={styles.Wrapper}>
            <Placeholder
                icon="post"
                title="Feed seems empty."
                text="Start following users to see their posts."
            />
        </div>
    );
}

export default Nopost;