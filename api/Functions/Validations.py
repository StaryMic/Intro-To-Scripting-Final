
min_needed_task_keys = ["name"]
allowed_task_keys = ["name", "completed"]

def is_valid_task_object(task_object : dict) -> bool:
    global min_needed_task_keys
    global allowed_task_keys

    # Ensure that the minimum needed keys are in the dictionary.
    task_keys = task_object.keys()
    for key in min_needed_task_keys:
        if key not in task_keys:
            return False

    # Make sure the dictionary doesn't have any illegal keys
    # If the task object has a key that isn't in the allowed_task_keys list
    # assume it is an illegal object and return False.
    for key in task_keys:
        if key not in allowed_task_keys:
            return False

    # Passed all checks.
    return True
