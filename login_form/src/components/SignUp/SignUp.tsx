import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../..';
import styles from './SignUp.module.css';

const USER_ALREADY_EXISTS_ERROR = "auth/email-already-in-use";

export const SignUp = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const inputRef1 = useRef<HTMLInputElement | null>(null);
    const inputRef2 = useRef<HTMLInputElement | null>(null);


    const onSignInClick = (): void => {
        navigate('/signin');
    }

    const onConfirmClick = async (): Promise<void> => {
    try {
        await createUserWithEmailAndPassword(firebaseAuth, login, password);
            navigate('/signin');
    } catch ({ code, message}) {
        if(code === USER_ALREADY_EXISTS_ERROR) {
            setError("User already exists. Try different login or go to Sign In");
            }
        setTimeout(() => {
            setError('');
        }, 3000);
        }
        if(inputRef1.current) {
            inputRef1.current.value = '';
        }
        if(inputRef2.current) {
            inputRef2.current.value = '';
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.header}>Join our application</p>
            <form className={styles.form}>
                <div className={styles.inputs}>
                    <input
                        ref={inputRef1}
                        type="text"
                        name="login"
                        placeholder="Type login"
                        onChange={(event) => setLogin(event.target.value)}
                        required
                    />
                     <input
                        ref={inputRef2}
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
                    <button type='button' onClick={onSignInClick}>
                        Sign In
                    </button>
                </div>
                <p className={styles.error}>{error}</p>
            </form>
        </div>
    )
}