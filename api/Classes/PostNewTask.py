import logging
from datetime import date
from typing import Any, Sequence

from psycopg import sql
from psycopg.sql import SQL, Composed

from api.Functions import StringExtensions


class PostNewTask:
    name: str

    def __init__(self, task):

        logging.debug(task)

        # Check for keys in the JSON input and add them to the object.
        if "name" in task:
            self.name = task["name"]


    def get_sql(self) -> sql.SQL:

        # Create the SQL Query
        query = sql.SQL("INSERT INTO tasks(name) VALUES (%s)")

        return query