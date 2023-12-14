import { PageHeader } from './components/PageHeader';
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { v4 as uuidv4 } from 'uuid';
import { AllBlocksContainer } from './components/AllBlocksContainer'; // Importando o novo componente
import axios from 'axios';
import TaskBlock from './components/TaskBlock';

const BACKEND_URL = 'http://localhost:8000'; // Substitua pelo URL do seu backend
const LOCAL_STORAGE_KEY = 'todo:tasks';
function updateBlockTitle(blocks, blockId, newTitle) {
  const blockIndex = blocks.findIndex(block => block.id === blockId);

  if (blockIndex === -1) {
    return blocks;
  }

  const updatedBlocks = blocks.map((block, index) => {
    if (index === blockIndex) {
      return { ...block, title: newTitle };
    }
    return block;
  });

  return updatedBlocks;
}
function App() {
  const [blocks, setBlocks] = useState([]);

  function loadSavedBlocks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(saved) {
      setBlocks(JSON.parse(saved));
    }
  }

  function setBlocksAndSave(newBlocks) {
    setBlocks(newBlocks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newBlocks));
  } 

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        
        const response = await axios.get(`${BACKEND_URL}/lists`, config);
        console.log(response.data)
setBlocks(response.data.lists); // Atualizando para acessar response.data.lists
      } catch (error) {
        console.error('Erro ao obter as listas:', error);
      }
    }
  
    fetchData(); // Chama a função fetchData dentro do useEffect
  }, []);

  async function addBlock(blockTitle) {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  
      const response = await axios.post(`${BACKEND_URL}/lists`, { name: blockTitle }, config);
      console.log('Response after adding block:', response);
  
      const newBlock = {
        id: response.data?._id,
        title: blockTitle,
        tasks: []
      };
  
      setBlocks(prevBlocks => [...prevBlocks, newBlock]); // Atualizando o estado usando o valor anterior
      setBlocksAndSave([...blocks, newBlock]); // Atualizando o localStorage
    } catch (error) {
      console.error('Erro ao adicionar bloco:', error);
    }
  }
  
  async function addTaskToBlock(blockId, taskTitle) {
    try {
      const response = await axios.post(`${BACKEND_URL}/tasks`, {
        descricao: taskTitle,
        completada: false,
        list: blockId
      });
  
      const newTask = {
        id: response.data._id,
        title: taskTitle,
        isCompleted: false
      };
  
      setBlocks(prevBlocks =>
        prevBlocks.map(block =>
          block.id === blockId ? { ...block, tasks: [...block.tasks, newTask] } : block
        )
      );
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  }

  async function deleteBlockById(blockId) {
    try {
      if (!blockId) {
        console.error('ID do bloco é inválido:', blockId);
        return;
      }
  
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  
      await axios.delete(`${BACKEND_URL}/lists/${blockId}`, config);
  
      setBlocks(prevBlocks => prevBlocks.filter(block => block.id !== blockId));
    } catch (error) {
      console.error('Erro ao deletar bloco:', error);
    }
  }

  function deleteTaskFromBlock(blockId, taskId) {
    setBlocks(prevBlocks =>
      prevBlocks.map(block =>
        block.id === blockId ? { ...block, tasks: block.tasks.filter(task => task.id !== taskId) } : block
      )
    );
  }

  function toggleTaskCompleted(blockId, taskId) {
    setBlocks(prevBlocks =>
      prevBlocks.map(block =>
        block.id === blockId
          ? {
              ...block,
              tasks: block.tasks.map(task =>
                task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
              )
            }
          : block
      )
    );

    const updatedBlocks = updateBlockTitle(blocks, blockId, 'Novo Título');
    setBlocksAndSave(updatedBlocks);
  }
  


  return (
    <>
      <PageHeader />
      <Header handleAddBlock={addBlock} isFirstBlock={true} />
      <AllBlocksContainer>

      {blocks.map((block, index) => (
  <TaskBlock
  key={block.id}
  blockId={block.id}
  blockTitle={block.title} // Certifique-se de passar o título do bloco corretamente
  isFirstBlock={index === 0}
  tasks={block.tasks}
  addTaskToBlock={addTaskToBlock}
  onAddTask={(taskTitle) => addTaskToBlock(block.id, taskTitle)}
  onDeleteTask={(taskId) => deleteTaskFromBlock(block.id, taskId)}
  onToggleTask={(taskId) => toggleTaskCompleted(block.id, taskId)}
  onDeleteBlock={() => deleteBlockById(block.id)}
/>
))}
</AllBlocksContainer>
    </>
  );
}

export default App;
