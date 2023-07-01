import React from 'react';
import styles from './Home.module.css';
import boxes from './stacked-boxes.png';

const Home = () => {
	return (
        <div className={styles.baseHome}>
            <div className={styles.leftSide}>
                <p className={styles.titleText}>GOT INVENTORY?</p>
                <button className={styles.browseButton}>Browse our public catalogue</button> 
            </div>
            <div className={styles.rightSide}>
            <img id='boxes' src={boxes} alt='stacked boxes'/>
            </div>
        </div>
	);
}

export default Home;
