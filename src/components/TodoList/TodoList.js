import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import './TodoList.css';

function TodoList({ todos, setTodos }) {
  const updateTask = (id) => {
    const updatedTasks = todos.map((todo) => {
      if (todo.id === id) {
        const task = { ...todo };
        task.completed = !task.completed;
        return task;
      }
      return todo;
    });
    setTodos(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTasks);
  };

  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState('');

  const editTask = (id) => {
    setEditTaskId(id);
    const task = todos.find((todo) => todo.id === id);
    setEditTaskValue(task.task);
  };

  const saveEditTask = (id) => {
    const updatedTasks = todos.map((todo) => {
      if (todo.id === id) {
        const task = { ...todo };
        task.task = editTaskValue;
        return task;
      }
      return todo;
    });
    setTodos(updatedTasks);
    setEditTaskId(null);
  };

  return (
    <div className="todolist-container">
      <div className="todos-container">
        <div>
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <div key={todo.id} className="todo-item">
                <div
                  className={`todo-checkbox ${todo.completed && 'todo-item-active'}`}
                  onClick={() => updateTask(todo.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      updateTask(todo.id);
                    }
                  }}
                  role="button"
                  tabIndex={index}
                >
                  {todo.completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </div>
                <div className="todo-task-container">
                  {editTaskId === todo.id ? (
                    <input
                      type="text"
                      className="todo-task-edit"
                      value={editTaskValue}
                      onChange={(e) => setEditTaskValue(e.target.value)}
                      onBlur={() => saveEditTask(todo.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          saveEditTask(todo.id);
                        }
                      }}
                    />
                  ) : (
                    <div
                      className={`todo-task ${todo.completed && 'todo-item-active'}`}
                      onClick={() => editTask(todo.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          updateTask(todo.id);
                        }
                      }}
                      role="button"
                      tabIndex={index}
                    >
                      <FaEdit className="edit-icon" />
                      {todo.task}
                    </div>
                  )}
                </div>

                <div className="todo-icons">
                  {editTaskId === todo.id ? null : (
                    <FaTrash
                      className="delete-icon"
                      title="Delete Task"
                      onClick={() => deleteTask(todo.id)}
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </div>
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      task: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default TodoList;
