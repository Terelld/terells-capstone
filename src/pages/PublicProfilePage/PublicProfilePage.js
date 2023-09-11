import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';



export default function PublicProfilePage(user, setUser) {
    const [userData, setUserData] = useState(null);
    const { userId } = useParams();
  
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchUserData();
    }, [userId]);
  
    return (
      <div>
        {/* ? this operator avoids an error whenuserData isn't availalbe. */}
        <h1>Member Profile</h1>
        <p>Name: {userData?.name}</p>
        <p>DOB: {userData?.dob}</p>
        <p>City: {userData?.city}</p>
        <p>Instrument: {userData?.primary_instrument}</p>
        <p>About me... {userData?.bio}</p>
      </div>
    );
  };



