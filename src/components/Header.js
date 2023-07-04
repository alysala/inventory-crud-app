import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({user, setUser}) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		if (window.confirm('Log out?')){
			setUser('');
			navigate('/', { replace: true })
		}
	};

	const handleLoginText = () => {
		if (user === ''){
			return <p className={styles.textRight} onClick={() => {navigate('/login', { replace: true })}}>Login</p>
		}
		else{
			return <p className={styles.textRight} onClick={() => handleLogout()}>{user}</p>
		}
	};

	return (
        <div className={styles.baseHeader}>
			<div>
				{handleLoginText()}
				<p className={styles.text} onClick={() => {navigate('/', { replace: true })}}>June 2023 CRUD Application Submission</p>
			</div>
        </div>
	);
}

export default Header;
