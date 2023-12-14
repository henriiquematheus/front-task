// TaskBlock/index.jsx
import React, { useEffect, useState } from 'react';
import { Tasks } from '../Tasks';
import { Header } from '../Header';
import { v4 as uuidv4 } from 'uuid';
import { TbTrash } from 'react-icons/tb'; // Importe o ícone para o botão de exclusão do bloco
import styles from './taskblock.module.css';

function TaskBlock({ blockTitle, tasks, onAddTask, onDeleteTask, onToggleTask, onDeleteBlock, isFirstBlock, blockId }) {
  const [localTasks, setLocalTasks] = useState(tasks);
  const [currentTitle, setCurrentTitle] = useState(blockTitle);

  const LOCAL_STORAGE_KEY = `todo:tasks:${currentTitle}`;

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setLocalTasks(JSON.parse(saved));
    }
    setCurrentTitle(blockTitle); // Atualize o currentTitle com o blockTitle
  }

  function setTasksAndSave(newTasks) {
    setLocalTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  useEffect(() => {
    setCurrentTitle(blockTitle);
    loadSavedTasks();
  }, [blockTitle]);

  function handleAddTask(taskTitle) {
    const newTask = {
      id: uuidv4(),
      title: taskTitle,
      isCompleted: false,
    };

    const updatedTasks = [...localTasks, newTask];
    setLocalTasks(updatedTasks);
    setTasksAndSave(updatedTasks);
    onAddTask(blockId, taskTitle);
  }

  function deleteTaskById(taskId) {
    const newTasks = localTasks.filter((task) => task.id !== taskId);
    setTasksAndSave(newTasks);
    onDeleteTask(blockId, taskId);
  }

  function toggleTaskCompletedById(taskId) {
    const newTasks = localTasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
    onToggleTask(blockId, taskId);
  }

  function handleDeleteBlock() {
    onDeleteBlock(blockId);
  }

  return (
    <div className={styles.taskBlockContainer} style={{ paddingTop: '100px' }}>
      <div className={styles.taskBlockContent}>
        <h2 className={styles.taskBlockTitle}>
          {currentTitle}
        </h2>
        <button className={styles.deleteButton} onClick={handleDeleteBlock}>
          <TbTrash size={20} />
          Excluir Bloco
        </button>
        <Header handleAddBlock={handleAddTask} isFirstBlock={isFirstBlock} />
        <Tasks tasks={localTasks} onDelete={deleteTaskById} onComplete={toggleTaskCompletedById} />
      </div>
    </div>
  );
}

export default TaskBlock;
