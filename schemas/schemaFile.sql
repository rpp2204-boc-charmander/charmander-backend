CREATE TABLE
  users (
    user_id SERIAL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    username VARCHAR(10),
    password VARCHAR(20)
  );

CREATE TABLE
  user_metrics (
    metric_id SERIAL PRIMARY KEY,
    weight VARCHAR(50),
    height VARCHAR(50),
    sex VARCHAR(10),
    user_id integer REFERENCES users
  );

CREATE TABLE
  muscle_groups (
    muscle_group_id SERIAL PRIMARY KEY,
    muscle_group VARCHAR(50)
  );

CREATE TABLE
  exercises (
    exercise_id SERIAL PRIMARY KEY,
    exercise VARCHAR(50),
    is_custom boolean,
    user_id integer REFERENCES users,
    muscle_group_id integer REFERENCES muscle_groups,
    goal_id integer REFERENCES goals
  );

CREATE TABLE
  goals (
    id_goal SERIAL PRIMARY KEY,
    reps integer DEFAULT 0,
    actual integer DEFAULT 0,
    calories_burned integer DEFAULT 0
  );

CREATE TABLE
  workouts (
    workout_id SERIAL PRIMARY KEY,
    exercise_id integer REFERENCES exercises,
    goal_id integer REFERENCES goals
  );

CREATE TABLE
  dates (
    date_id SERIAL PRIMARY KEY,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    workout_id integer REFERENCES workouts,
    user_id integer REFERENCES users
  );

INSERT INTO
  public.users (user_id, firstname, lastname, username, password)
VALUES
  (DEFAULT, 'jack', 'reacher', 'jack123', '123');

INSERT INTO
  public.muscle_groups (muscle_group_id, muscle_group)
VALUES
  (DEFAULT, 'chest');

INSERT INTO
  public.exercises (
    exercise_id,
    exercise,
    is_custom,
    user_id,
    muscle_group_id
  )
VALUES
  (DEFAULT, 'chest press', false, 1, 1);

INSERT INTO
  public.goals (id_goal, reps, actual, calories_burned)
VALUES
  (1, 10, DEFAULT, DEFAULT);