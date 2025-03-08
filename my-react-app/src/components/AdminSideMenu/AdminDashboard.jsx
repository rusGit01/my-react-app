import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  // State for key metrics
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalFiles: 0,
    storageUsage: "0%",
  });

  // State for recent activity
  const [recentActivity, setRecentActivity] = useState([]);

  // State for notifications
  const [notifications, setNotifications] = useState([]);

  // State for system status
  const [systemStatus, setSystemStatus] = useState({
    server: "Online",
    database: "Healthy",
    uptime: "99.9%",
  });

  // Simulate fetching data
  useEffect(() => {
    // Replace with real API calls
    const fetchMetrics = async () => {
      const exampleMetrics = {
        totalUsers: 100,
        activeUsers: 85,
        totalFiles: 1234,
        storageUsage: "75%",
      };
      setMetrics(exampleMetrics);
    };

    const fetchRecentActivity = async () => {
      const exampleActivity = [
        { id: 1, action: "New user registered: user1@example.com", timestamp: "2023-10-01 10:00 AM" },
        { id: 2, action: "File uploaded by user2@example.com", timestamp: "2023-10-01 09:30 AM" },
        { id: 3, action: "Admin updated role for admin@example.com", timestamp: "2023-10-01 09:00 AM" },
      ];
      setRecentActivity(exampleActivity);
    };

    const fetchNotifications = async () => {
      const exampleNotifications = [
        { id: 1, message: "Storage usage is at 75%", type: "warning" },
        { id: 2, message: "New update available", type: "info" },
      ];
      setNotifications(exampleNotifications);
    };

    fetchMetrics();
    fetchRecentActivity();
    fetchNotifications();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      {/* Quick Actions at the Top Right */}
      <div className={styles.quickActionsContainer}>
        <button className={styles.actionButton}>Add New User</button>
        <button className={styles.actionButton}>Manage Roles</button>
        <button className={styles.actionButton}>View Files</button>
      </div>

      {/* Admin Dashboard Title */}
      <h1>Admin Dashboard</h1>

      {/* Key Metrics */}
      <div className={styles.metricsContainer}>
        <div className={styles.metricCard}>
          <h3>Total Users</h3>
          <p>{metrics.totalUsers}</p>
        </div>
        <div className={styles.metricCard}>
          <h3>Active Users</h3>
          <p>{metrics.activeUsers}</p>
        </div>
        <div className={styles.metricCard}>
          <h3>Total Files</h3>
          <p>{metrics.totalFiles}</p>
        </div>
        <div className={styles.metricCard}>
          <h3>Storage Usage</h3>
          <p>{metrics.storageUsage}</p>
        </div>
      </div>

      {/* Recent Activity in a Table */}
      <div className={styles.recentActivityContainer}>
        <h2>Recent Activity</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.activityTable}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.timestamp}</td>
                  <td>{activity.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Status */}
      <div className={styles.systemStatusContainer}>
        <h2>System Status</h2>
        <p>
          Server:{" "}
          <span style={{ color: systemStatus.server === "Online" ? "green" : "red" }}>
            {systemStatus.server}
          </span>
        </p>
        <p>
          Database:{" "}
          <span style={{ color: systemStatus.database === "Healthy" ? "green" : "red" }}>
            {systemStatus.database}
          </span>
        </p>
        <p>Uptime: {systemStatus.uptime}</p>
      </div>

      {/* Notifications */}
      <div className={styles.notificationsContainer}>
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className={styles.notification}>
              <span className={styles[notification.type]}>{notification.message}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;