import styles from './SignIn.module.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../..';
import { StoreContext } from '../../StoreProvider';

export const SignIn = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {setIsLoggedIn} = useContext(StoreContext);

    const onSignUpClick = (): void => {
        navigate('/signup');
    }

    const onConfirmClick = async (): Promise<void> => {
        try {
            await signInWithEmailAndPassword(firebaseAuth, login, password);
            setIsLoggedIn(true);
            navigate("/home");
        } catch ({message}) {
            setError('Wrong login or password. Please try again or go to Sign up');

            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.header}>Welcome to the app!</p>
            <form className={styles.form}>
                <div className={styles.inputs}>
                    <input 
                        type="text"
                        name="login"
                        placeholder="Type login"
                        onChange={(event) => setLogin(event.target.value)}
                        required 
                    />
                     <input 
                        type="password"
                        name="password"
                        placeholder="Type password"
                        onChange={(event) => setPassword(event.target.value)}
                        required 
                    />
                </div>
                <div className={styles.buttons}>
                    <button type='button' onClick={onConfirmClick}>
                        Confirm
                    </button>
                    <button type='button' onClick={onSignUpClick}>
                        Sign Up
                    </button>
                </div>
                <p className={styles.error}>{error}</p>
            </form>
        </div>
    )
}