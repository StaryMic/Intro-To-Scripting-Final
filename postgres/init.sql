CREATE TABLE tasks
(
    id           SERIAL PRIMARY KEY,

    name         varchar(64) NOT NULL,

    date_created TIMESTAMP    DEFAULT current_timestamp,

    completed    BOOLEAN DEFAULT false
);

-- Create a test task
INSERT INTO tasks(name)
VALUES ('Test Task');