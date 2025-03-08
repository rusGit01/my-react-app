import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, NavLink } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Home from "../components/UserSideMenu/Home.jsx";
import AllFiles from "../components/UserSideMenu/AllFiles.jsx";
import RecentlyAdded from "../components/UserSideMenu/RecentlyAdded.jsx";
import DeletedFiles from "../components/UserSideMenu/DeletedFiles.jsx";
import Settings from "../components/UserSideMenu/Settings.jsx";
import AdminDashboard from "../components/AdminSideMenu/AdminDashboard.jsx";
import AllUsers from "../components/AdminSideMenu/AllUsers.jsx";
import Login from "../components/Login/Login.jsx";
import ConfirmationDialog from "../components/Common/ConfirmationDialog.jsx";
import styles from "./App.module.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const navigate = useNavigate();

  // Check if the user is already logged in on app load
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedRole = localStorage.getItem("userRole");
    if (storedAuth === "true" && storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    }
  }, []);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
    navigate(role === "admin" ? "/admin-dashboard" : "/");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    setShowLogoutDialog(false);
    navigate("/login");
  };

  // Main website layout (includes sidebar, header, and footer)
  const MainLayout = ({ children }) => (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.contentContainer}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <ul className={styles.sidebarList}>
            {/* Conditional Rendering Based on Role */}
            {userRole === "admin" ? (
              // Admin Sidebar Links
              <>
                <li className={styles.sidebarItem}>
                  <NavLink
                    to="/admin-dashboard"
                    className={({ isActive }) =>
                      isActive ? `${styles.sidebarLink} ${styles.activeLink}` : styles.sidebarLink
                    }
                  >
                    Admin Dashboard
                  </NavLink>
                </li>
                <li className={styles.sidebarItem}>
                  <NavLink
                    to="/all-users"
                    className={({ isActive }) =>
                      isActive ? `${styles.sidebarLink} ${styles.activeLink}` : styles.sidebarLink
                    }
                  >
                    All Users
                  </NavLink>
                </li>
              </>
            ) : (
              // User Sidebar Links
              <>
                <li className={styles.sidebarItem}>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? `${styles.sidebarLink} ${styles.activeLink}` : styles.sidebarLink
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className={styles.sidebarItem}>
                  <NavLink
                    to="/all-files"
                    className={({ isActive }) =>
                      isActive ? `${styles.sidebarLink} ${styles.activeLink}` : styles.sidebarLink
                    }
                  >
                    All Files
                  </NavLink>
                </li>
                <li className={styles.sidebarItem}>
                  <NavLink
                    to="/recently-added"
                    className={({ isActive }) =>
                      isActive ? `${styles.sidebarLink} ${styles.activeLink}` : styles.sidebarLink
                    }
                  >
                    Recently Added
                  </NavLink>
                </li>
                <li className={styles.sidebarItem}>
                  <NavLink
                    to="/deleted-files"
                    className={({ isActive }) =>
                      isActive ? `${styles.sidebarLink} ${styles.activeLink}` : styles.sidebarLink
                    }
                  >
                    Deleted Files
                  </NavLink>
                </li>
              </>
            )}

            {/* Common Links (Settings and Logout) */}
            <li className={`${styles.sidebarItem} ${styles.divider}`}></li>
            <li className={styles.sidebarItem}>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive ? `${styles.sidebarLink} ${styles.activeLink}` : styles.sidebarLink
                }
              >
                Settings
              </NavLink>
            </li>
            <li className={styles.sidebarItem}>
              <div
                className={styles.sidebarLink}
                onClick={() => setShowLogoutDialog(true)}
              >
                Logout
              </div>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className={styles.mainContent}>{children}</div>
      </div>
      <Footer />

      {/* Confirmation Dialog for Logout */}
      {showLogoutDialog && (
        <ConfirmationDialog
          message="Are you sure you want to log out?"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutDialog(false)}
        />
      )}
    </div>
  );

  return (
    <Routes>
      {/* Login Page */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={userRole === "admin" ? "/admin-dashboard" : "/"} />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      {/* User Routes */}
      <Route
        path="/"
        element={
          isAuthenticated && userRole === "user" ? (
            <MainLayout>
              <Home />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/all-files"
        element={
          isAuthenticated && userRole === "user" ? (
            <MainLayout>
              <AllFiles />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/recently-added"
        element={
          isAuthenticated && userRole === "user" ? (
            <MainLayout>
              <RecentlyAdded />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/deleted-files"
        element={
          isAuthenticated && userRole === "user" ? (
            <MainLayout>
              <DeletedFiles />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/settings"
        element={
          isAuthenticated ? (
            <MainLayout>
              <Settings />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin-dashboard"
        element={
          isAuthenticated && userRole === "admin" ? (
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/all-users"
        element={
          isAuthenticated && userRole === "admin" ? (
            <MainLayout>
              <AllUsers />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;