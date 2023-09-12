import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './UserProfilePage.css';



export default function UserProfilePage({ user, setUser }) {
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
            const response = await fetch(`http://localhost:3001/api/users/${userId}`); 
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

    useEffect(() => {
        fetchUserData();
    }, [userId, user.primary_instrument]); 




    return (
        <div className="page"> 
            <h1>Meet, <span style={{ color: 'blue' }}>{user.name}</span>!</h1>
            <p>Age: {user ? calculateAge(user.dob) : 'N/A'}</p>
            <p>City: {user.city}</p>
            <p>Instrument: {user.primary_instrument}</p>
            <p class="flow-text">About me: {user.bio}</p>
            <Link to={`/bandmate/user-profile/update/${encodeURIComponent(user._id.toString())}`}>
            <button>Edit Profile</button>
            </Link>
      </div>

    );
};