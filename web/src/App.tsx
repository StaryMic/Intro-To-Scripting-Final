import './App.css'
import TaskListView from "./CustomElements/TaskListView.tsx";
import {useState} from "react";
import Task from "./Classes/TaskClass.ts";

function App() {
    const [tasks, _setTasks] = useState([new Task("james", new Date(), false)]);


  return (
    <>
        <h1>Amazing and totally not rushed task list app #439767</h1>
        <TaskListView tasks={tasks}/>
    </>
  )
}

export default App
