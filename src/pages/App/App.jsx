import {useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import AuthPage from '../AuthPage/AuthPage';
import UserProfilePage from '../UserProfilePage/UserProfilePage';
import UserListPage from '../UserListPage/UserListPage';
import PublicProfilePage from '../PublicProfilePage/PublicProfilePage';
import EditProfilePage from '../EditProfilePage/EditProfilePage';
import { useParams } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';

import './App.css';
import './style.css';





export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
        <>
          <NavBar className="nav" user={ user }  setUser={ setUser }/>
          <Routes>
            <Route path="/bandmate/user-profile" element={<UserProfilePage user={user} />} />
            <Route path="/bandmate/user-profile/update/:userId" element={<EditProfilePage user={user} />} />
            <Route path="/bandmate/members" element={<UserListPage />} /> 
            <Route path="/bandmate/members/profile/:userId" element={<PublicProfilePage user={user} />} /> 
            
          </Routes>
        </>
        :
        <AuthPage setUser={ setUser } />
      }
    </main>
  );
}

