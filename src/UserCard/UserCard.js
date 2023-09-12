
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


export default function UserCard({ user, setUser }) {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null); // State to store user data

    // Function to fetch user data
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
    }, [userId]); 
    return (
    <div className="user-card">
        <h3>Name: {user.name}</h3>
        <p>City: {user.city}</p>
        <p>Genre: {user.genre}</p>
        <p>Instument: {user.primary_instrument}</p>
        {/* {user.secondary_instrument && (
        <p>Secondary Instrument: {user.secondary_instrument}</p> */}
        {/* )}   */}
    </div>

    );
}