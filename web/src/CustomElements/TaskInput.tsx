export default function TaskInput(props: {
    refreshFunction: Function;
}) {

    function submitNewTask(formData: FormData) {
        const taskName = formData.get("taskName");

        if (taskName === "") {
            alert("Cannot submit task with an empty name.");
            return;
        }

        fetch("http://localhost:5000/api/PostTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: taskName,
            })
        })
            .then(props.refreshFunction());
    }


    return (
        <form action={submitNewTask}>
            <div>
                <label htmlFor="taskInput">Task Name</label>
                <br/>
                <input id="taskInput" type={"text"} name={"taskName"} onKeyPress={
                    (e) => {
                        if (e.key === 'Enter') {
                            // PLEASE STOP SUBMITTING WHEN I HIT ENTER :(
                            // For some reason this prevents the refresh function from working.
                            // No clue why.
                            e.preventDefault();
                        }
                    }
                }/>
            </div>
            <button type={"submit"}>Submit Task</button>
        </form>
    )
}