import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();

	return (
    <div className={styles.form}>
     <h2>Login</h2>
     <form>
       <div>
         <label>Username </label>
         <input type='text' name='uname' required />
       </div>
       <div>
         <label>Password </label>
         <input type='password' name='pass' required />
       </div>
       <div>
         <input type='submit' />
       </div>
     </form>
     <p className={styles.buttonText} onClick={() => {navigate('/create-account', { replace: true })}}>Don't have an account? Create one here.</p>
   </div>
	);
}

export default Login;
