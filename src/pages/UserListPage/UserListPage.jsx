import React, { useState, useEffect } from 'react';
import UserCard from '../../UserCard/UserCard.js';
import "./UserListPage.css";
import { Link } from 'react-router-dom';


export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Fetch users from the server's API endpoint
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

    return (

      <div>
      <h1>User List</h1>
      <div className="user-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          users.map((user, index) => (
            <Link
              key={index}
              to={`/bandmate/members/profile/${encodeURIComponent(user._id.toString())}`}
              // to={`/users/${encodeURIComponent(user.userID)}`} // Adjust the route path as needed
              className="user-link"
            >
              <UserCard key={index} user={user} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
