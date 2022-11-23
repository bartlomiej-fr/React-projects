import React, {FC, useContext} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { StoreContext } from "../../StoreProvider";
import { SongsList } from "../SongsList/SongsList";
import { firebaseAuth } from "../../index";
import { signOut } from "firebase/auth";

export const Home: FC = () => {
    const navigate = useNavigate();
    const {username, setIsLoggedIn} = useContext(StoreContext);

    const onLogOutClick = async (): Promise<void> => {
        await signOut(firebaseAuth);
        setIsLoggedIn(false);
        navigate('/signin');
    }

    return (
        <div className={styles.container}>
            <p className={styles.header}>Welcome to our app {username}</p>
            <SongsList/>
            <button className={styles.logutBtn} onClick={onLogOutClick}>Log out</button>
        </div>
    );
};