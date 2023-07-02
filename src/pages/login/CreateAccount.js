import React from 'react';
import styles from './Login.module.css';

const CreateAccount = () => {
	return (
        <div className={styles.form}>
        <h2>Create Account</h2>
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
            <label>Confirm Password </label>
            <input type='password' name='pass' required />
          </div>
          <div>
            <input type='submit' />
          </div>
        </form>
      </div>
	);
}

export default CreateAccount;
