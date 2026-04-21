from flask import Flask, request, Response
import logging
from psycopg import connect

from Classes.DatabaseManager import DatabaseManager
from Classes.PostNewTask import PostNewTask
from Functions import Validations

con_string : str = "dbname=maindb user=postgres password=password host=172.18.0.2 port=5432"
db_manager : DatabaseManager = DatabaseManager(con_string)
app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

# API ENDPOINTS
@app.get('/api/GetAllTasks')
def get_all_tasks():
    return db_manager.execute(
        """
        SELECT * FROM tasks;
        """
    )

@app.post('/api/PostTask')
def post_task():
    # Data should come in as JSON
    req_object = request.get_json()

    # Check if it is a valid PostTask object
    valid : bool = Validations.is_valid_task_object(req_object)
    if not valid:
        return Response(response="Invalid Task Object. Rejected. Check that the keys inside the Task are valid, or that you at least have a Name for the task.", status=400)

    # Make a new PostTask object using the json
    new_task_req = PostNewTask(req_object)

    # Send it to the DB.
    db_manager.execute(
        """
        
        """
    )





if __name__ == '__main__':
    app.run()
