import {useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from '../../components/NavBar/NavBar';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import UserProfilePage from '../UserProfilePage/UserProfilePage';

import { getUser } from '../../utilities/users-service';


export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={ user }  setUser={ setUser }/>
          <Routes>
            <Route path="/bandmate/user-profile" element={<UserProfilePage />} />
            <Route path="/bandmate/new" element={<NewOrderPage />} />
            <Route path="/bandmate" element={<OrderHistoryPage />} />
          </Routes>
        </>
        :
        <AuthPage setUser={ setUser } />
      }
    </main>
  );
}

