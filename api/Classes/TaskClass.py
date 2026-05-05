import json
from datetime import datetime


class Task:

    id : int
    name : str
    date_created : datetime
    is_completed : bool

    def __init__(self, data):
        if data is dict:
            self.id = data["id"]
            self.name = data["name"]
            self.date_created = data["date_created"]
            self.is_completed = data["is_completed"]
        if data is list:
            print("list data: ", data)
            self.id = int(data[0])
            self.name = str(data[1])
            self.date_created = datetime.fromtimestamp(data[2])
            self.is_completed = bool(data[3])

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    # def __dict__(self):
    #     return {
    #         "id": self.id,
    #         "name": self.name,
    #         "date_created": self.date_created,
    #         "is_completed": self.is_completed,
    #     }
