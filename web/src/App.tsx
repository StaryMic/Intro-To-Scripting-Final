import './App.css'
import TaskListView from "./CustomElements/TaskListView.tsx";
import {useEffect, useState} from "react";
import Task from "./Classes/TaskClass.ts";
import TaskInput from "./CustomElements/TaskInput.tsx";

function App() {
    const [tasks, setTasks] = useState([] as Task[]);

    function refreshTasks() {
        // Hacky timeout stuff because sometimes it doesn't have enough time to get the full list.
        // .then() is supposed to kinda help with this, but it doesn't.
        setTimeout(() => {
            fetch("http://localhost:5000/api/GetAllTasks").then(res => res.json())
            .then(data => data as Task[])
            .then((taskList: Task[]) => {
                setTasks(taskList);
                console.log("Page should refresh now...")
            })
        }, 150);
    }

    useEffect(() => {
        refreshTasks();
    }, []);


    return (
        <>
            <h1>Amazing task app</h1>
            <h2>By Alexander Elledge</h2>
            {tasks.length > 0 ? TaskListView({
                tasks,
                refreshFunction: refreshTasks,
            }) : "Either you have no tasks, or you failed to get a response from the API."}
            <hr/>
            <TaskInput refreshFunction={refreshTasks}/>
        </>
    )
}

export default App
