import { useState, useEffect } from 'react';
import './App.css';
import { TaskCreator } from './components/TaskCreator'
import { TaskTable } from './components/TaskTable'
import { VisibilityControl } from './components/VisibilityControl';

function App() {

  const [taskItems, setTasksItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false)



  function createNewTask(taskName) {
    if (!taskItems.find(task => task.name === taskName)) {
      setTasksItems([...taskItems, { name: taskName, done: false }])
    }
  }

  const toggleTask = task => {
    setTasksItems(
      taskItems.map(t => (t.name === task.name) ? { ...t, done: !t.done } : t)
    )

  }

  useEffect(() => {
    let data = localStorage.getItem('tasks')
    if (data) {
      setTasksItems(JSON.parse(data))
    }
  }, [])

  const cleanTasks = () => {
    setTasksItems(taskItems.filter(task => !task.done))
    setShowCompleted(false)
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  }, [taskItems])

  return (
    <main className="bg-dark vh-100 text-white">
      <div className='container p-4 col-md-4 offset-md-4'>
        <TaskCreator createNewTask={createNewTask} />
        <TaskTable tasks={taskItems} toggleTask={toggleTask} />
        <VisibilityControl
          isChecked={showCompleted}
          setShowCompleted={(checked) => setShowCompleted(checked)}
          cleanTasks={cleanTasks}
        />
        {
          showCompleted === true && (
            <TaskTable tasks={taskItems} toggleTask={toggleTask} showCompleted={showCompleted} />
          )
        }
     </div>
    </main>
  );
}

export default App;
