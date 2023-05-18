import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import AddInput from './components/AddInput/AddInput';
import TodoList from './components/TodoList/TodoList';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const localData = localStorage.getItem('todos');
    if (localData) {
      setData(JSON.parse(localData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(data));
  }, [data]);

  const handleClearCompleted = () => {
    const newTodos = data.filter((todo) => !todo.completed);
    setData(newTodos);
  };

  return (
    <div className="app">
      <Header title="To-do list" />
      <div className="container">
        <AddInput setTodos={setData} todos={data} />
        {data.length > 0 ? (
          <TodoList todos={data} setTodos={setData} />
        ) : (
          <h2>Add your first task!</h2>
        )}
        <button
          type="button"
          className="clear-btn"
          onClick={handleClearCompleted}
        >
          Clear Completed Tasks
        </button>
      </div>
    </div>
  );
}

export default App;
