export default function UserCard({ user }) {
    return (
      <div className="user-card">
        <h2>{user.name}</h2>
        <h3>{user.city}</h3>
        <h3>{user.primary_instrument}</h3>
      </div>
    );
  }