from datetime import date
from typing import Any, Sequence

from psycopg import sql
from psycopg.sql import SQL, Composed


class PostNewTask:
    name: str
    description: str | None
    due_date: date | None

    def __init__(self, task):
        self.name = task["name"]
        self.description = (None, task["description"])[task["description"] is not None]
        self.due_date = (None, date.fromisoformat(task["due_date"]))[task["due_date"] is not None]

    # TODO: Test this.
    def get_sql(self) -> Composed:
        return sql.SQL("INSERT INTO tasks (name, description, due_date) VALUES ({values})").format(
            values=','.join([self.name, str(self.description), str(self.due_date)])
        )