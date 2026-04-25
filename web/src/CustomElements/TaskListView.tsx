import TaskView from "./TaskView.tsx";
import type Task from "../Classes/TaskClass.ts";

export default TaskListView

function TaskListView(props : {tasks: Task[]}) {
    const taskViewList = props.tasks.map(task => <TaskView Task={task}/>);
    return(
        <ul>
            {taskViewList}
        </ul>
    )
}