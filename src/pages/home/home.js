import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import boxes from './stacked-boxes.png';

const Home = () => {
    const navigate = useNavigate();

	return (
        <div className={styles.baseHome}>
            <div className={styles.leftSide}>
                <h1 className={styles.titleText}>GOT INVENTORY?</h1>
                <button className={styles.browseButton} onClick={() => {navigate('/inventory', { replace: true })}}>Browse our public listings</button> 
            </div>
            <div className={styles.rightSide}>
            <img id='boxes' src={boxes} alt='stacked boxes'/>
            </div>
        </div>
	);
}

export default Home;
