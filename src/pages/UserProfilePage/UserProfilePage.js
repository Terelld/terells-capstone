import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function UserProfilePage({ user, setUser }) {
    console.log(user.primary_instrument);
    const { userId } = useParams();
    const [userData, setUserData] = useState(null); // State to store user data
    const instruments = [];

    if (user.primary_instrument) {
      instruments.push(user.primary_instrument);
    }
  
    if (user.secondary_instrument) {
      instruments.push(user.secondary_instrument);
    }
   
    const fetchUserData = async () => {
        try {
            const response = await fetch(`/api/users/${userId}`); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUserData(data); // Update user data in state
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch user data when the component mounts
    useEffect(() => {
        fetchUserData();
    }, [userId, user.primary_instrument]); 




    return (
    <div>
        <h1>Member Profile</h1>
        <p>Name: {user.name}</p>
        <p>DOB: {user.dob}</p>
        <p>City: {user.city}</p>
        <p>Instument: {user.primary_instrument}</p>
        {/* <p>Instument(s): {user.primary_instrument} {user.secondary_instrument ? `, ${user.secondary_instrument}` : ''}</p> */}
        <p>About me... {user.bio}</p>
    </div>

    );
    
};