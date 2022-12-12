CREATE TABLE
  users (
    id SERIAL NOT NULL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    username VARCHAR(20),
    password VARCHAR(20),
    weight_lbs integer,
    height_inches integer,
    sex VARCHAR(50)
  );

CREATE TABLE
  muscle_groups (
    id SERIAL NOT NULL PRIMARY KEY,
    muscle_group VARCHAR(50)
  );

CREATE TABLE
  exercises (
    id SERIAL NOT NULL PRIMARY KEY,
    exercise VARCHAR(50),
    muscle_group_id integer REFERENCES muscle_groups (id),
    user_id integer REFERENCES users (id)
  );

CREATE TABLE
  dates (
    id SERIAL NOT NULL PRIMARY KEY,
    log_date DATE NOT NULL DEFAULT CURRENT_DATE
  );

CREATE TABLE
  goals (
    id SERIAL NOT NULL PRIMARY KEY,
    exercise_position integer,
    weight_lbs integer,
    reps integer,
    reps_actual integer DEFAULT 0,
    est_cals_burned integer DEFAULT 0,
    date_id integer REFERENCES dates (id),
    user_id integer REFERENCES users (id),
    exercise_id integer REFERENCES exercises (id)
  );

CREATE TABLE
  burned_calories (
    id SERIAL NOT NULL PRIMARY KEY,
    total_cals_burned integer REFERENCES exercises (id),
    date_id integer REFERENCES dates (id),
    user_id integer REFERENCES users (id)
  );

-- INSERT default users
INSERT INTO
  public.users (
    id,
    firstname,
    lastname,
    username,
    password,
    weight_lbs,
    height_inches,
    sex
  )
VALUES
  (
    1,
    'Ash',
    'Ketchum',
    'pika2',
    '123',
    160,
    65,
    'male'
  ),
  (
    2,
    'Tom',
    'Cruise',
    'maverick123',
    '123',
    150,
    67,
    'male'
  ),
  (
    3,
    'Britney',
    'Spears',
    'babybaby5',
    '123',
    130,
    64,
    'female'
  ),
  (
    4,
    'Hafthor',
    'Bjornsson',
    'daMountain',
    '123',
    335,
    81,
    'male'
  );

-- INSERT default muscle groups
INSERT INTO
  public.muscle_groups (id, muscle_group)
VALUES
  (1, 'Biceps'),
  (2, 'Triceps'),
  (3, 'Chest'),
  (4, 'Shoulders'),
  (5, 'Back'),
  (6, 'Hamstrings'),
  (7, 'Quads'),
  (8, 'Glutes'),
  (9, 'Calves'),
  (10, 'Abs');

-- INSERT default exercises for Biceps
INSERT INTO
  public.exercises (id, exercise, muscle_group_id, user_id)
VALUES
  (DEFAULT, 'DB Curls', 1, null),
  (DEFAULT, 'Hammer Curls', 1, null),
  (DEFAULT, 'Cable Curls', 1, null),
  (DEFAULT, 'Concentration Curls', 1, null),
  (DEFAULT, 'Preacher Curls', 1, null),
  (DEFAULT, 'DB Alternating Curls', 1, null),
  (DEFAULT, 'EZ Bar Curls', 1, null),
  (DEFAULT, 'Barbell Curls', 1, null);

-- INSERT default exercises for Triceps
INSERT INTO
  public.exercises (id, exercise, muscle_group_id, user_id)
VALUES
  (DEFAULT, 'Skullcrusher', 2, null),
  (DEFAULT, 'DB Pull Overs', 2, null),
  (DEFAULT, 'Tricep Pushdown', 2, null),
  (DEFAULT, 'Dips', 2, null),
  (DEFAULT, 'Preacher Curls', 2, null),
  (DEFAULT, 'DB Alternating Curls', 2, null),
  (DEFAULT, 'EZ Bar Curls', 2, null),
  (DEFAULT, 'Barbell Curls', 2, null),
  (DEFAULT, 'Tricep Kick Back', 2, null),
  (DEFAULT, 'Closegrip Bench', 2, null);

-- INSERT default exercises for Chest
INSERT INTO
  public.exercises (id, exercise, muscle_group_id, user_id)
VALUES
  (DEFAULT, 'DB Decline Press', 3, null),
  (DEFAULT, 'Machine Incline Press', 3, null),
  (DEFAULT, 'Cable Cross Overs', 3, null),
  (DEFAULT, 'Barbell Bench Press', 3, null),
  (DEFAULT, 'Machine Chest Press', 3, null),
  (DEFAULT, 'DB Bench', 3, null),
  (DEFAULT, 'Incline Bench', 3, null),
  (DEFAULT, 'Decline Bench', 3, null),
  (DEFAULT, 'Cambered Bar Bench', 3, null),
  (DEFAULT, 'Machine Incline Bench', 3, null);

-- INSERT default exercises for Shoulders
INSERT INTO
  public.exercises (id, exercise, muscle_group_id, user_id)
VALUES
  (DEFAULT, 'Shrugs', 4, null),
  (DEFAULT, 'Upright Rows', 4, null),
  (DEFAULT, 'DB Lateral Raise', 4, null),
  (DEFAULT, 'DB Front Raises', 4, null),
  (DEFAULT, 'DB Arnold Press', 4, null),
  (DEFAULT, 'Machine Military Press', 4, null),
  (DEFAULT, 'Push Press', 4, null),
  (DEFAULT, 'Face Pulls', 4, null),
  (DEFAULT, 'Cable Upright Rows', 4, null),
  (DEFAULT, 'DB Cuban Press', 4, null);

-- INSERT default exercises for Back
INSERT INTO
  public.exercises (id, exercise, muscle_group_id, user_id)
VALUES
  (DEFAULT, 'Chest Supported Rows', 5, null),
  (DEFAULT, 'Inverted Rows', 5, null),
  (DEFAULT, 'DB Rows', 5, null),
  (DEFAULT, 'T-Bar Rows', 5, null),
  (DEFAULT, 'Lat Pulldowns', 5, null),
  (DEFAULT, 'Seated Rows', 5, null),
  (DEFAULT, 'Seal Rows', 5, null),
  (DEFAULT, 'Bent-over Rows', 5, null),
  (DEFAULT, 'Rack Pulls', 5, null),
  (DEFAULT, 'Pendlay Rows', 5, null);

-- INSERT default exercises for Hamstrings
INSERT INTO
  public.exercises (id, exercise, muscle_group_id, user_id)
VALUES
  (DEFAULT, 'DB RDLs', 6, null),
  (DEFAULT, 'Seated Leg Curl', 6, null),
  (DEFAULT, 'Hamstring Curls', 6, null),
  (DEFAULT, 'Romanian Dealift', 6, null),
  (DEFAULT, 'Good Mornings', 6, null),
  (DEFAULT, 'Standing Leg Curl', 6, null),
  (DEFAULT, 'Stiff Leg Deadlift', 6, null),
  (DEFAULT, 'Single Leg Hip Thrust', 6, null),
  (DEFAULT, 'Landmine Single Leg RDL', 6, null),
  (DEFAULT, 'Reverse Hyperextension', 6, null);

-- INSERT default exercises for Quads
INSERT INTO
  public.exercises (id, exercise, muscle_group_id, user_id)
VALUES
  (DEFAULT, 'Leg Extensions', 7, null),
  (DEFAULT, 'Split Squat (Quad Emphasis)', 7, null),
  (DEFAULT, 'Lunges', 7, null),
  (DEFAULT, 'Reverse Hack Squat', 7, null),
  (DEFAULT, 'Leg Press', 7, null),
  (DEFAULT, 'Belt Squats', 7, null),
  (DEFAULT, 'Goblet Squats', 7, null),
  (DEFAULT, 'Front Squats', 7, null),
  (DEFAULT, 'Barbell Squats', 7, null),
  (DEFAULT, 'Safety Bar Squats', 7, null);

-- INSERT default exercises for Glutes
INSERT INTO
  public.exercises (id, exercise, muscle_group_id, user_id)
VALUES
  (DEFAULT, 'Barbell Glute Bridge', 8, null),
  (DEFAULT, 'Split Squat (Glutes Emphasis)', 8, null),
  (DEFAULT, 'Reverse Hyper', 8, null),
  (DEFAULT, 'Glute Kickbacks', 8, null),
  (DEFAULT, 'Smith Machine Hip Thrusts', 8, null),
  (DEFAULT, 'Smith Machine Reverse Lunge', 8, null),
  (DEFAULT, 'Lateral Lunge', 8, null);

-- INSERT default exercises for Calves
INSERT INTO
  public.exercises (id, exercise, muscle_group_id, user_id)
VALUES
  (DEFAULT, 'Single Leg Calf Raise', 9, null),
  (DEFAULT, 'Bent Knee Calf Raises', 9, null),
  (DEFAULT, 'Calf Raises', 9, null),
  (DEFAULT, 'Barbell Seated Calf Raise', 9, null),
  (DEFAULT, 'Smith Machine Calf Raise', 9, null),
  (DEFAULT, 'Seated Calf Raise', 9, null);

-- INSERT custom exercises for Abs
INSERT INTO
  public.exercises (id, exercise, muscle_group_id, user_id)
VALUES
  (DEFAULT, 'Barbell Russian Twists', 10, null),
  (DEFAULT, 'Cable Crunch', 10, null),
  (DEFAULT, 'Hanging Leg Raises', 10, null),
  (DEFAULT, 'Weighted Situps', 10, null),
  (DEFAULT, 'Front Plank', 10, null);

-- INSERT custom exercises for daMountain
INSERT INTO
  public.exercises (id, exercise, muscle_group_id, user_id)
VALUES
  (DEFAULT, 'Farmers walk', 5, 4),
  (DEFAULT, 'Car Deadlift', 6, 4),
  (DEFAULT, 'Sled Pull', 5, 4),
  (DEFAULT, 'Monster Dumbbell Press', 4, 4);

-- INSERT custom exercises for Britney
INSERT INTO
  public.exercises (id, exercise, muscle_group_id, user_id)
VALUES
  (DEFAULT, 'Stone Throws', 4, 3),
  (DEFAULT, 'Upside down lats pulls', 5, 3),
  (DEFAULT, 'one legged bench press', 3, 3),
  (DEFAULT, 'Vader raises', 4, 3);

-- INSERT custom exercises for Tom
INSERT INTO
  public.exercises (id, exercise, muscle_group_id, user_id)
VALUES
  (DEFAULT, 'Belly Flops', 10, 2),
  (DEFAULT, 'Helicopter Jump', 7, 2),
  (DEFAULT, 'Drone Swings', 10, 2);

-- INSERT custom exercises for Ash
INSERT INTO
  public.exercises (id, exercise, muscle_group_id, user_id)
VALUES
  (DEFAULT, 'Pokeball Throws', 4, 1);

-- INSERT
INSERT INTO
  public.exercises (id, exercise, muscle_group_id, user_id)
VALUES
  (DEFAULT, 'Pokeball Throws', 4, 1);