import UserCard from "../../UserCard/UserCard.js";
import { useState, useEffect } from 'react';

export default function UserListPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
   
    fetch('api/users') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <div className="user-cards">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}