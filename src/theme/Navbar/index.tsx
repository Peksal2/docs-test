import React from 'react';
import OriginalNavbar from '@theme-original/Navbar';
import { useAuth } from '../../contexts/AuthContext';
import styles from './styles.module.css';

export default function Navbar(props) {
  const { user, logout } = useAuth();

  return (
    <div className={styles.navbarWrapper}>
      <OriginalNavbar {...props} />
      {user && (
        <div className={styles.logoutContainer}>
          <span className={styles.userName}>{user.name}</span>
          <button onClick={logout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
