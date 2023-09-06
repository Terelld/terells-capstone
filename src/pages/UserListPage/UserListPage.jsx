
import userEvent from "@testing-library/user-event";
import UserCard from "../../UserCard/UserCard.js";


export default function UserListPage() {
  const allUsersSet = new Set();


  const allUsers = Array.from(allUsersSet);

  return (
    <div>
      <h1>BandMate Member List</h1>
      <div className="user-list">
        {allUsers.map((user, index) => (
          <div key={index} className="user-card">
            {user}
          </div>
        ))}
      </div>
    </div>
  );
}
