import type Task from "../Classes/TaskClass.ts";
import * as React from "react";

export default TaskView

function TaskView(props: {
    Task: Task,
    refreshFunction: Function
}) {
    const task: Task = props.Task


    // This handles marking a task as complete in the DB
    function handleComplete(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        fetch(`http://localhost:5000/api/MarkTaskAsCompleted/${task.id}`, {
            method: "POST",
        })
            .then(props.refreshFunction());
    }

    // This handles deleting a task in the DB.
    function handleDelete(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        fetch(`http://localhost:5000/api/DeleteTask/${task.id}`, {
            method: 'DELETE'
        })
            .then(props.refreshFunction());
    }

    function GetDateTimeStringInANiceFormat(dateTime:Date) {
        dateTime = new Date(dateTime);
        return `${dateTime.getFullYear()}/${dateTime.getMonth() + 1}/${dateTime.getDate()} ${dateTime.getHours()}:${dateTime.getMinutes()}`;
    }

    return (
        <tr key={task.id}>
            <td>{task.name}</td>
            <td>{GetDateTimeStringInANiceFormat(task.date_created)}</td>
            <td>{task.is_completed.toString()}</td>
            <td>
                <button onClick={(e) => handleComplete(e)}>Mark as Complete</button>
                <button onClick={(e) => handleDelete(e)}>Delete</button>
            </td>
        </tr>
    )
}