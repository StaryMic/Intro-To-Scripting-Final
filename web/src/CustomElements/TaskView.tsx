import type Task from "../Classes/TaskClass.ts";

export default TaskView

function TaskView(props : {Task: Task}){
    const task : Task = props.Task

    return(
        <li>
            <span>{task.name}</span>
            <span>{task.is_completed.toString()}</span>
        </li>
    )


}