// components/AllBlocksContainer/index.jsx
import '../../styles/global.css';
import styles from './allBlocksContainer.module.css';

export function AllBlocksContainer({ children }) {
    return (
      <div className={`${styles.container} scrollbar-style`}>
        {children}
      </div>
    );
  }