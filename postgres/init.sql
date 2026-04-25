CREATE TABLE tasks
(
    id           SERIAL PRIMARY KEY,

    name         varchar(64) NOT NULL,

    date_created DATE    DEFAULT current_date,

    completed    BOOLEAN DEFAULT false
);

-- Create a test task
INSERT INTO tasks(name)
VALUES ('Test Task');