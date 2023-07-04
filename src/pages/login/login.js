import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = ({user, setUser}) => {
  const navigate = useNavigate();
  const [uname, setUname] = useState('');
  const [pword, setPword] = useState('');
  const handleUnameChange = (e) => setUname(e.target.value);
  const handlePasswordChange = (e) => setPword(e.target.value);

  const loginAccount = () => {
    let account = {
        'username': uname,
        'password': pword
      };
    axios.post(
        'http://127.0.0.1:5000/create-account',
        account,
        {withCredentials: true}
    ).then((response) => {
        console.log(response);
        alert(`logged in as ${response.data.current_user}`);
        setUser(response.data.current_user);
        console.log(user);
        navigate('/inventory', { replace: true });
    }).catch((err) => {
      alert(err.response.data.message);
      console.log(err);
    });
      console.log(account);
  };

	return (
    <div className={styles.form}>
     <h2>Login</h2>
     <form>
       <div>
         <label>Username </label>
         <input type='text' name='uname' value={uname} onChange={handleUnameChange} required />
       </div>
       <div>
         <label>Password </label>
         <input type='password' name='pass' value={pword} onChange={handlePasswordChange} required />
       </div>
     </form>
     <div>
        <p className={styles.button} type='submit' onClick={() => loginAccount()}> Submit </p>
      </div>
     <p className={styles.buttonText} onClick={() => {navigate('/create-account', { replace: true })}}>Don't have an account? Create one here.</p>
   </div>
	);
}

export default Login;
