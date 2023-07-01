import React from 'react';
import styles from './Header.module.css';

const Header = () => {
	return (
        <div className={styles.baseHeader}>
			<div>
				<p className={styles.textRight}>Login</p>
				<p className={styles.text}>June 2023 CRUD Application Submission</p>
			</div>
        </div>
	);
}

export default Header;
