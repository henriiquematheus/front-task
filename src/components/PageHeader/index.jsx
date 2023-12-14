import React from 'react';
import styles from './pageHeader.module.css';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

export function PageHeader() {
  return (
    <header className={`${styles.pageHeader} scrollbar-style`}>
      <h1 className={styles.title}>Gerenciador de Tarefas</h1>
      <div className={styles.userActions}>
        <FaUser size={20} />
        <FaSignOutAlt size={20} />
      </div>
    </header>
  );
}