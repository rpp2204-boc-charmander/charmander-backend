/* sudo -u username psql -d database -a -f filepath.sql */
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
  workout_exercises (
    id SERIAL NOT NULL PRIMARY KEY,
    est_cals_burned integer DEFAULT 0,
    log_date DATE NOT NULL,
    exercise_id integer REFERENCES exercises (id),
    is_complete boolean DEFAULT false,
    user_id integer REFERENCES users (id)
  );

CREATE TABLE
  exercise_set (
    id SERIAL NOT NULL PRIMARY KEY,
    weight_lbs integer,
    reps integer,
    reps_actual integer DEFAULT 0,
    workout_exercise_id integer REFERENCES workout_exercises (id)
  );

CREATE TABLE
  daily_calories (
    id SERIAL NOT NULL PRIMARY KEY,
    total_cals_burned integer,
    total_cals_gained integer,
    log_date DATE NOT NULL,
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

-- INSERT workout exercises for daMountain for two separate days

INSERT INTO public.workout_exercises(
	log_date, exercise_id, user_id)
	VALUES ('2022-12-13',
			(SELECT id FROM exercises WHERE exercise='DB Alternating Curls'),
			(SELECT id FROM users WHERE username='daMountain')),('2022-12-13',
			(SELECT id FROM exercises WHERE exercise='Barbell Russian Twists'),
			(SELECT id FROM users WHERE username='daMountain')),('2022-12-13',
			(SELECT id FROM exercises WHERE exercise='Smith Machine Reverse Lunge'),
			(SELECT id FROM users WHERE username='daMountain')),('2022-12-14',
			(SELECT id FROM exercises WHERE exercise='Glute Kickbacks'),
			(SELECT id FROM users WHERE username='daMountain')),('2022-12-14',
			(SELECT id FROM exercises WHERE exercise='Barbell Squats'),
			(SELECT id FROM users WHERE username='daMountain')),('2022-12-14',
			(SELECT id FROM exercises WHERE exercise='Barbell Squats'),
			(SELECT id FROM users WHERE username='daMountain'));

-- INSERT sets for daMountain for workout_id=1

INSERT INTO public.exercise_set(
	weight_lbs, reps, workout_exercise_id)
	VALUES (50, 10, 1), (50, 10, 1),(80, 20, 1), (90, 10, 1);


-----------------------------------------------------------
     -- INSERT STATEMENTS FOR REPORT MOCK DATA --
-----------------------------------------------------------
-- Insert dates
INSERT INTO public.dates(log_date)
  VALUES ('2022-12-20'), ('2021-4-16'), ('2022-12-13');

-- Insert exercises for users
INSERT INTO public.workout_exercises(log_date, exercise_id, is_complete, user_id)
  VALUES ('2022-1-4', 26, true, 1),('2022-1-13', 26, true, 1),('2022-1-24', 26, true, 1),('2022-3-2', 26, true, 1),('2022-3-14', 26, true, 1),('2022-4-21', 26, true, 1),('2022-5-5', 26, true, 1),('2022-5-14', 26, true, 1),('2022-5-27', 26, true, 1),('2022-5-28', 26, true, 1),('2022-7-26', 26, true, 1),('2022-7-27', 26, true, 1),('2022-7-29', 26, true, 1),('2022-8-5', 26, true, 1),('2022-8-8', 26, true, 1),('2022-8-14', 26, true, 1),('2022-8-19', 26, true, 1),('2022-10-6', 26, true, 1),('2022-10-10', 26, true, 1),('2022-10-11', 26, true, 1),('2022-10-12', 26, true, 1),('2022-10-22', 26, true, 1),('2022-11-14', 26, true, 1),('2022-12-20', 26, true, 1),('2022-12-23', 26, true, 1),('2022-2-13',39, true, 1),('2022-3-16',39, true, 1),('2022-3-20',39, true, 1),('2022-3-28',39, true, 1),('2022-4-12',39, true, 1),('2022-4-21',39, true, 1),('2022-5-19',39, true, 1),('2022-7-30',39, true, 1),('2022-10-12',39, true, 1),('2022-11-21',39, true, 1),('2022-1-1', 65, true, 1),('2022-2-1', 65, true, 1),('2022-3-1', 65, true, 1),('2022-4-1', 65, true, 1),('2022-5-1', 65, true, 1),('2022-6-1', 65, true, 1),('2022-7-1', 65, true, 1),('2022-8-1', 65, true, 1),('2022-9-1', 65, true, 1),('2022-10-1', 65, true, 1),('2022-11-1', 65, true, 1),('2022-12-1', 65, true, 1),('2021-1-11', 58, true, 1),('2021-3-1', 58, true, 1),('2021-4-6', 58, true, 1),('2021-4-12', 58, true, 1),('2021-4-28', 58, true, 1),('2021-5-26', 58, true, 1),('2021-6-7', 58, true, 1),('2021-7-11', 58, true, 1),('2021-9-21', 58, true, 1),('2021-10-17', 58, true, 1),('2021-10-27', 58, true, 1),('2021-10-28', 58, true, 1),('2021-4-9', 46, true, 1),('2021-4-10', 46, true, 1),('2021-4-11', 46, true, 1),('2021-4-12', 46, true, 1),('2021-4-13', 46, true, 1),('2021-4-14', 46, true, 1),('2021-4-15', 46, true, 1),('2021-4-16', 46, true, 1),('2021-4-17', 46, true, 1),('2021-4-18', 46, true, 1),('2021-4-19', 46, true, 1),('2022-12-13', 21, true, 2),('2022-12-14', 21, true, 2),('2022-12-15', 21, true, 2),('2022-12-16', 21, true, 2),('2022-12-17', 21, true, 2),('2022-12-18', 21, true, 2),('2022-12-19', 21, true, 2),('2022-1-1', 31, true, 2),('2022-2-1', 31, true, 2),('2022-3-1', 31, true, 2),('2022-4-1', 31, true, 2),('2022-5-1', 31, true, 2),('2022-6-1', 31, true, 2),('2022-7-1', 31, true, 2),('2022-8-1', 31, true, 2),('2022-9-1', 31, true, 2),('2022-10-1', 31, true, 2),('2022-11-1', 31, true, 2),('2022-12-1', 31, true, 2);

-- Insert sets for exercises
INSERT INTO public.exercise_set (weight_lbs, reps, workout_exercise_id)
  VALUES (120, 10, 7), (115, 10, 7), (105, 10, 7), (220, 10, 8), (215, 10, 8), (205, 10, 8), (270, 10, 9), (265, 10, 9), (255, 10, 9), (160, 10, 10), (155, 10, 10), (145, 10, 10), (150, 10, 11), (145, 10, 11), (135, 10, 11), (145, 10, 12), (140, 10, 12), (130, 10, 12), (70, 10, 13), (65, 10, 13), (55, 10, 13), (90, 10, 14), (85, 10, 14), (75, 10, 14), (180, 10, 15), (175, 10, 15), (165, 10, 15), (210, 10, 16), (205, 10, 16), (195, 10, 16), (200, 10, 17), (195, 10, 17), (185, 10, 17), (230, 10, 18), (225, 10, 18), (215, 10, 18), (260, 10, 19), (255, 10, 19), (245, 10, 19), (150, 10, 20), (145, 10, 20), (135, 10, 20), (180, 10, 21), (175, 10, 21), (165, 10, 21), (290, 10, 22), (285, 10, 22), (275, 10, 22), (200, 10, 23), (195, 10, 23), (185, 10, 23), (300, 10, 24), (295, 10, 24), (285, 10, 24), (240, 10, 25), (235, 10, 25), (225, 10, 25), (300, 10, 26), (295, 10, 26), (285, 10, 26), (160, 10, 27), (155, 10, 27), (145, 10, 27), (175, 10, 28), (170, 10, 28), (160, 10, 28), (195, 10, 29), (190, 10, 29), (180, 10, 29), (180, 10, 30), (175, 10, 30), (165, 10, 30), (80, 10, 31), (75, 10, 31), (65, 10, 31), (150, 10, 32), (145, 10, 32), (135, 10, 32), (250, 10, 33), (245, 10, 33), (235, 10, 33), (140, 10, 34), (135, 10, 34), (125, 10, 34), (80, 10, 35), (75, 10, 35), (65, 10, 35), (250, 10, 36), (245, 10, 36), (235, 10, 36), (190, 10, 37), (185, 10, 37), (175, 10, 37), (230, 10, 38), (225, 10, 38), (215, 10, 38), (100, 10, 39), (95, 10, 39), (85, 10, 39), (170, 10, 40), (165, 10, 40), (155, 10, 40), (180, 10, 41), (175, 10, 41), (165, 10, 41), (500, 10, 42), (495, 10, 42), (485, 10, 42), (100, 10, 43), (95, 10, 43), (85, 10, 43), (50, 10, 44), (45, 10, 44), (35, 10, 44), (78, 10, 45), (73, 10, 45), (63, 10, 45), (236, 10, 46), (231, 10, 46), (221, 10, 46), (367, 10, 47), (362, 10, 47), (352, 10, 47), (400, 10, 48), (395, 10, 48), (385, 10, 48), (200, 10, 49), (195, 10, 49), (185, 10, 49), (300, 10, 50), (295, 10, 50), (285, 10, 50), (158, 10, 51), (153, 10, 51), (143, 10, 51), (198, 10, 52), (193, 10, 52), (183, 10, 52), (220, 10, 53), (215, 10, 53), (205, 10, 53), (30, 10, 54), (25, 10, 54), (15, 10, 54), (50, 10, 55), (45, 10, 55), (35, 10, 55), (45, 10, 56), (40, 10, 56), (30, 10, 56), (80, 10, 57), (75, 10, 57), (65, 10, 57), (100, 10, 58), (95, 10, 58), (85, 10, 58), (125, 10, 59), (120, 10, 59), (110, 10, 59), (120, 10, 60), (115, 10, 60), (105, 10, 60), (110, 10, 61), (105, 10, 61), (95, 10, 61), (130, 10, 62), (125, 10, 62), (115, 10, 62), (150, 10, 63), (145, 10, 63), (135, 10, 63), (140, 10, 64), (135, 10, 64), (125, 10, 64), (145, 10, 65), (140, 10, 65), (130, 10, 65), (130, 10, 66), (125, 10, 66), (115, 10, 66), (150, 10, 67), (145, 10, 67), (135, 10, 67), (140, 10, 68), (135, 10, 68), (125, 10, 68), (140, 10, 69), (135, 10, 69), (125, 10, 69), (180, 10, 70), (175, 10, 70), (165, 10, 70), (200, 10, 71), (195, 10, 71), (185, 10, 71), (205, 10, 72), (200, 10, 72), (190, 10, 72), (210, 10, 73), (205, 10, 73), (195, 10, 73), (215, 10, 74), (210, 10, 74), (200, 10, 74), (220, 10, 75), (215, 10, 75), (205, 10, 75), (220, 10, 76), (215, 10, 76), (205, 10, 76), (350, 10, 77), (345, 10, 77), (335, 10, 77), (220, 10, 78), (215, 10, 78), (205, 10, 78), (280, 10, 79), (275, 10, 79), (265, 10, 79), (250, 10, 80), (245, 10, 80), (235, 10, 80), (380, 10, 81), (375, 10, 81), (365, 10, 81), (360, 10, 82), (355, 10, 82), (345, 10, 82), (420, 10, 83), (415, 10, 83), (405, 10, 83), (500, 10, 84), (495, 10, 84), (485, 10, 84), (100, 10, 85), (95, 10, 85), (85, 10, 85), (50, 10, 86), (45, 10, 86), (35, 10, 86), (78, 10, 87), (73, 10, 87), (63, 10, 87), (236, 10, 88), (231, 10, 88), (221, 10, 88), (367, 10, 89), (362, 10, 89), (352, 10, 89), (400, 10, 90), (395, 10, 90), (385, 10, 90), (200, 10, 91), (195, 10, 91), (185, 10, 91), (300, 10, 92), (295, 10, 92), (285, 10, 92), (158, 10, 93), (153, 10, 93), (143, 10, 93), (198, 10, 94), (193, 10, 94), (183, 10, 94), (220, 10, 95), (215, 10, 95), (205, 10, 95);