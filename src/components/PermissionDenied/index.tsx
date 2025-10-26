import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function PermissionDenied() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Access Denied</h1>
        <p>You don't have permission to view this page.</p>
        <p>Please contact your administrator if you believe this is an error.</p>
        <Link to="/" className={styles.homeLink}>
          Go to Home
        </Link>
      </div>
    </div>
  );
}
