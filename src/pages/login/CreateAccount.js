import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const CreateAccount = ({user, setUser}) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [uname, setUname] = useState('');
  const [pword, setPword] = useState('');
  const navigate = useNavigate();

  const createNewAccount = () => {
    let newAccount = {
      'firstname': fname,
      'lastname': lname,
      'username': uname,
      'password': pword
    };
    axios.post(
      'http://127.0.0.1:5000/create-account',
      newAccount,
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
    console.log(newAccount);
  };

  const handleFnameChange = (e) => setFname(e.target.value);
  const handleLnameChange = (e) => setLname(e.target.value);
  const handleUnameChange = (e) => setUname(e.target.value);
  const handlePasswordChange = (e) => setPword(e.target.value);

	return (
        <div className={styles.form}>
        <h2>Create Account</h2>
        <form>
          <div>
            <label>First Name </label>
            <input type='text' name='firstname' value={fname} onChange={handleFnameChange} required />
          </div>
          <div>
            <label>Last Name </label>
            <input type='text' name='lastname' value={lname} onChange={handleLnameChange}  required />
          </div>
          <div>
            <label>Username </label>
            <input type='text' name='username' value={uname} onChange={handleUnameChange}  required />
          </div>
          <div>
            <label>Password </label>
            <input type='password' name='password' value={pword} onChange={handlePasswordChange}  required />
          </div>
        </form>
        <div>
            <p className={styles.button} type='submit' onClick={() => createNewAccount()}> Submit </p>
        </div>
      </div>
	);
}

export default CreateAccount;
