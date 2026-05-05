import datetime
import json
from datetime import date
from typing import Any

from flask import Flask, request, Response
import logging

from flask_cors import CORS

from Classes.DatabaseManager import DatabaseManager
from Classes.PostNewTask import PostNewTask
from Functions import Validations
from api.Classes.TaskClass import Task

host: str = 'localhost'
con_string: str = f"dbname=maindb user=postgres password=password host={host} port=5432"
db_manager: DatabaseManager = DatabaseManager(con_string)
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}}, origins="*")
logging.basicConfig(level=logging.DEBUG) # LOG EVERYTHING


# API ENDPOINTS
@app.get('/api/GetAllTasks')
def get_all_tasks():
    # Get the data from the DB
    # Data comes back as an array of array of the data.
    # I don't like that it comes back like this :(
    keys = ["id", "name", "date_created", "is_completed"]

    data = db_manager.execute(
        """
        SELECT *
        FROM tasks;
        """
    )

    print(data)

    # Loop through the data and change all Date objects into iso strings
    formatted_data = []
    for row in data:
        formatted_data.append(
            (row[0], row[1], row[2].isoformat(), row[3])
        )

    # Turn the data into a dictionary
    json_data = []
    for row in formatted_data:
        json_data.append(dict(zip(keys, row)))

    # Turn it into JSON
    json_dump = json.dumps(json_data)

    print(json_dump)

    # Return the JSON.
    return Response(
        response=json_dump,
        status=200,
        mimetype="application/json",
        content_type="application/json"
    )


@app.post('/api/PostTask')
def post_task():
    # Data should come in as JSON
    req_object = request.get_json()

    logging.info(req_object)

    # Check if it is a valid PostTask object
    valid: bool = Validations.is_valid_task_object(req_object)
    if not valid:
        print("Got an invalid task post request.")
        return Response(
            response="Invalid Task Object. Rejected. Check that the keys inside the Task are valid, or that you at least have a Name for the task.",
            status=400)

    # Make a new PostTask object using the json
    new_task_req = PostNewTask(req_object)

    # Send it to the DB.
    db_manager.execute_with_params(new_task_req.get_sql(), [new_task_req.name])
    return Response(
        response="Task Posted Successfully",
        status=200
    )

@app.delete('/api/DeleteTask/<task_id>')
def delete_task(task_id):
    db_manager.execute_with_params("""
    DELETE FROM tasks WHERE id = %s;
                                   """, [task_id])
    return Response(
        response="Task Deleted Successfully",
        status=200
    )

@app.post('/api/MarkTaskAsCompleted/<task_id>')
def mark_task_as_completed(task_id):
    result = db_manager.execute_with_params("""
    UPDATE tasks
    SET completed = TRUE
        WHERE id = %s;
    """, [task_id])
    print(result)
    return Response(
        response="Task Updated Successfully",
        status=200
    )


if __name__ == '__main__':
    app.run()
