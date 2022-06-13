import React from 'react';
import './App.css';
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from './components/TodoList';
import {Tasks} from "./types/taskTypes";
import Filters from "./components/Filters";
import Counter from "./components/Counter";




function App() {

  const [tasks, setTasks] = React.useState<Tasks>([]);
  const [filter, setFilter] = React.useState(0);

  React.useEffect(() => {
      if (!localStorage.getItem('tasks')) return;
      const items = localStorage.getItem('tasks') || '[]';
      const json = JSON.parse(items) as Tasks;
      setTasks(json);
  }, [])

  const saveAndSetTasks = (tasks: Tasks) => {
      setTasks(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  const changeTaskTitle = (value: string, id: string) => {
      const task = tasks.find(obj => obj.id === id);
      if (task) {
          const newTask = {...task, value};
          const i = tasks.findIndex(obj => obj.id === id);
          const newTasks = [...tasks];
          newTasks[i] = newTask;
          saveAndSetTasks(newTasks);
      }
  }

  const doneTask = (id: string) => {
      const task = tasks.find(obj => obj.id === id);
      if (task) {
          const taskDone = {...task, active: false};
          const newTasks = [...tasks];
          const i = tasks.findIndex(obj => obj.id === id);
          newTasks[i] = taskDone;
          saveAndSetTasks(newTasks)
      }
  }

  const removeTask = (id: string) => {
      const newTasks = tasks.filter(obj => obj.id !== id);
      saveAndSetTasks(newTasks);
  }

  const removeAllMadeTasks = () => {
      saveAndSetTasks([...tasks].filter(obj => obj.active));
  }

  const filterTask = (filterProperty: number) => {
      setFilter(filterProperty);
  }

  const createTodo = (value: string, id: string) => {
     saveAndSetTasks([...tasks, {value, id, active: true}]);
  }

  return (
      <div className="wrapper">
        <div className="to-do__container">
          <div className="to-do__active">
            <div className="to-do__title">
              <h2>8-Bit To-Do List</h2>
            </div>
            <div className="to-do__list">
              <TodoList tasks={tasks} filterProperty={filter} changeTaskTitle={changeTaskTitle} doneTask={doneTask} removeTask={removeTask}/>
            </div>
              <div className='container-field nes-container is-dark'>
                  <TodoForm createTodo={createTodo} length={tasks.length} removeAllMadeTasks={removeAllMadeTasks}/>
                  <div className='to-do-utils'>
                      <Filters filterTask={filterTask} filterProperty={filter}/>
                      <Counter count={tasks.filter(obj => obj.active).length}/>
                  </div>
              </div>
          </div>
        </div>
      </div>
  );
}

export default App;


