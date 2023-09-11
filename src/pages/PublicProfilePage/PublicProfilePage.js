import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';



export default function PublicProfilePage() {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null); 
    console.log(userData);
    
    const fetchUserData = async () => {
      
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('This is the data in fetch', data);
        setUserData(data);
        console.log('data:', data);
        console.log('userId:', userId);

      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      if (userId) {
        fetchUserData();
      }
    }, [ ]);

    
  
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



