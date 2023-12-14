import styles from './header.module.css';
import '../../styles/global.css'; // Importe o arquivo global.css
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

export function Header({ handleAddBlock, isFirstBlock, blockTitle }) {
  const [title, setTitle] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    handleAddBlock(title);
    setTitle('');
  }

  function onChangeTitle(event) {
    setTitle(event.target.value);
  }

  return (
    <header className={`${styles.header} scrollbar-style`}>
      <h2>{blockTitle}</h2> {/* Display the block title here */}
      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <input
          placeholder={isFirstBlock ? 'Add a new list' : 'Add a new task'}
          type="text"
          onChange={onChangeTitle}
          value={title}
        />
        <button>Create <AiOutlinePlusCircle size={20} /></button>
      </form>
    </header>
  );
}
