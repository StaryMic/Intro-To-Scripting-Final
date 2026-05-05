import TaskView from "./TaskView.tsx";
import type Task from "../Classes/TaskClass.ts";

export default TaskListView

function TaskListView(props: {
    tasks: Task[],
    refreshFunction: () => void,
}) {
    const taskViewList = props.tasks.map(task => <TaskView Task={task} key={task.id} refreshFunction={props.refreshFunction}/>);
    return (
        <table className="task-list" key={"tablekeypleasestoptellingmetoaddakeyherethankyou"}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Date Created</th>
                <th>Completed?</th>
                <th>Actions</th>
            </tr>
            </thead>

            <tbody>
            {taskViewList}
            </tbody>
        </table>
    )
}