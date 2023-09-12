import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';



export default function PublicProfilePage() {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null); 
    
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

    function calculateAge(dateOfBirth) {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      
      return age;
    }
    
    // const dateOfBirth = '1990-05-15'; // Replace with the actual date of birth
    // const age = calculateAge(dateOfBirth);
    // console.log(`Age: ${age}`);
  
    useEffect(() => {
      if (userId) {
        fetchUserData();
      }
    }, [ ]);

    
  
    return (
      <div>
        {/* ? this operator avoids an error whenuserData isn't availalbe. */}
        
        <h1>Meet, {userData?.name}!</h1>
        <p>Age: {userData ? calculateAge(userData.dob) : 'N/A'}</p>
        <p>City: {userData?.city}</p>
        <p>Instrument: {userData?.primary_instrument}</p>
        <p>About me... {userData?.bio}</p>
      </div>


    );
  };



