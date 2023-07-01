import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
	const navigate = useNavigate();

	return (
        <div className={styles.baseHeader}>
			<div>
				<p className={styles.textRight} onClick={() => {navigate('/login', { replace: true })}}>Login</p>
				<p className={styles.text} onClick={() => {navigate('/', { replace: true })}}>June 2023 CRUD Application Submission</p>
			</div>
        </div>
	);
}

export default Header;
