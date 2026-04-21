CREATE TABLE tasks
(
    id           SERIAL PRIMARY KEY,

    name         varchar(64) NOT NULL,
    description  varchar(256),

    date_created DATE    DEFAULT current_date,
    due_date     DATE,

    completed    BOOLEAN DEFAULT false
);

-- Create a test task
INSERT INTO tasks(name)
VALUES ('Test Task');