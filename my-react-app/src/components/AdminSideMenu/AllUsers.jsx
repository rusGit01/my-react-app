import React, { useState, useEffect } from "react";
import styles from "./AllUsers.module.css"; // Import the CSS module

const AllUsers = () => {
  // State to store the list of users
  const [users, setUsers] = useState([]);

  // Simulate fetching users from an API or database
  useEffect(() => {
    // Replace this with an actual API call to fetch users
    const fetchUsers = async () => {
      // Example static data (replace with real data)
      const exampleUsers = [
        { id: 1, email: "user1@example.com", role: "user" },
        { id: 2, email: "admin@example.com", role: "admin" },
        { id: 3, email: "user2@example.com", role: "user" },
      ];
      setUsers(exampleUsers);
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <h1>All Users</h1>
      <p>This section displays a list of all users in the system.</p>

      {/* Table to display users */}
      <div className={styles.tableWrapper}>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;