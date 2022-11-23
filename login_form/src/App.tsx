import React, {FC, useEffect, useContext} from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import { SignUp } from './components/SignUp/SignUp';
import { SignIn } from './components/SignIn/SignIn';
import { Home } from './components/Home/Home';
import { onAuthStateChanged } from 'firebase/auth';
import {query, where, getDocs, collection} from 'firebase/firestore';
import { firebaseAuth, firebaseDb } from './index';
import { StoreContext } from './StoreProvider';
import ProtectedRoutes from './components/ProtectedRoutes';

export const App: FC = () => {
  const navigate = useNavigate();
  const {username, setUsername, setSongs, setIsLoggedIn} = useContext(StoreContext); 

  useEffect((): void => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if(user) {
        const userEmail = user.email;
        setUsername(userEmail || '');
        setIsLoggedIn(true);
        try {
          const songs: string[] = [];
          const q = query(collection(firebaseDb, 'songs'), where('userEmail', '==', userEmail));
          const songsSnapshot = await getDocs(q);
          songsSnapshot.forEach((song) => {
            const {name: songName} = song.data();
            songs.push(songName);
          });
          setSongs(songs) 
        } catch (error) {
          console.log(error);
        }
      } else {
        setUsername('');
        setSongs([]);
      }
    })
  }, [setIsLoggedIn, setSongs, setUsername]);

  useEffect((): void => {
    if(username) {
      navigate('/home');
    } else {
      navigate('/signin');
    }
}, [username]);


  return (
    <Routes>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route element={<ProtectedRoutes/>}>
        <Route path='/home' element={<Home/>}/>
      </Route>
    </Routes>
  );
}

export default App;
