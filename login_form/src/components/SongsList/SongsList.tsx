import {useContext, useRef, useState} from 'react';
import {doc, setDoc} from 'firebase/firestore';
import { StoreContext } from '../../StoreProvider';
import { firebaseDb } from '../../index';
import {v4 as uuid} from 'uuid';
import styles from './SongsList.module.css';


export const SongsList = () => {
    const {songs, setSongs, username} = useContext(StoreContext);
    const [currentSong, setCurrentSong] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const addSong = async (): Promise<void> => {
        try {
            const productId = uuid();
            await setDoc(doc(firebaseDb, 'songs', productId), {
                name: currentSong,
                userEmail: username
            });
            const updatedSongs = [...songs, currentSong];
            setSongs(updatedSongs);
            if(inputRef.current) {
                inputRef.current.value = '';
            }
            setCurrentSong('');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.addSongsContainer}>
                <input
                    ref={inputRef}
                    type='text'
                    name='Songs'
                    placeholder='Add a song title'
                    onChange={(event) => setCurrentSong(event.target.value)}
                />
                <button type='button' onClick={addSong}>Add song</button>
            </div>
            <div className={styles.list}>
                {
                    songs.map((song, index) => (
                        <p className={styles.song} key={index}>{song}</p>
                    ))
                }
            </div>
        </div>
    );
};