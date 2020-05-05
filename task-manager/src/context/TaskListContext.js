import React,{ createContext, useState, useEffect } from "react";
import uuid from 'uuid'

export const TaskListContext = createContext()

const TaskListContextProvider = props => {
  const initialState = JSON.parse(localStorage.getItem('taks')) || []

  const [tasks, setTasks] = useState(initialState)

  useEffect( () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks] )

  const [editItem, setEditItem] = useState(null) 

  // Add Task
  const addTask = title => {
    setTasks( [...tasks, { title, id: uuid() }] )
  }

  // Remove Tasks
  const removeTasks = id => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  // Clear Tasks
  const clearList = () => {
    setTasks( [] )
  }

  // Find Tasks
  const findItem = id => {
    const item = tasks.find(task => task.id === id)

    setEditItem(item)
  }

  // Edit Task
  const editTask = (title, id) => {
    const newTasks = tasks.map(task => (task.id === id ? {title, id} : task ))
  
    console.log(newTasks)

    setTasks(newTasks)
    setEditItem(null)

  }

  return (
    <TaskListContext.Provider
    value={ {
      tasks,
      addTask,
      removeTasks,
      clearList,
      findItem,
      editTask,
      editItem
    }}
    >
      {props.children}
    </TaskListContext.Provider>
  )
}

export default TaskListContextProvider;

