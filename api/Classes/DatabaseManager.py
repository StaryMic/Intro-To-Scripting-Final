import psycopg
from psycopg import connect, connection, cursor


class DatabaseManager:
    connection_string = "localhost"
    connection: psycopg.Connection | None = None

    def __init__(self, connection_string):
        self.connection = connect(connection_string)

    def connect(self):
        self.connection = connect(self.connection_string)

    def close(self):
        if self.connection is not None:
            self.connection.close()
        else:
            print("You cannot close an unopened connection.")

    def execute(self, query) -> list:
        with self.connection.cursor() as cur:
            cur.execute(query)
            self.connection.commit()
            return cur.fetchall()