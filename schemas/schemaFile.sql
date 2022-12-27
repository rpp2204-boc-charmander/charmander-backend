CREATE TABLE
  users (
    id SERIAL NOT NULL PRIMARY KEY,
    auth_id VARCHAR(200) DEFAULT null,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    email VARCHAR(50),
    user_password VARCHAR(60),
    weight_lbs integer,
    height_inches integer,
    sex VARCHAR(50),
    profile_pic VARCHAR(100)
  );

CREATE TABLE
  muscle_groups (
    id SERIAL NOT NULL PRIMARY KEY,
    muscle_group VARCHAR(50),
    photo_url VARCHAR(250)
  );

CREATE TABLE
  exercises (
    id SERIAL NOT NULL PRIMARY KEY,
    exercise VARCHAR(50),
    muscle_group_id integer REFERENCES muscle_groups (id),
    user_id integer REFERENCES users (id) ON DELETE CASCADE DEFAULT null
  );

CREATE TABLE
  workout_exercises (
    id SERIAL NOT NULL PRIMARY KEY,
    est_cals_burned integer DEFAULT 0,
    log_date DATE NOT NULL,
    is_complete boolean DEFAULT false,
    exercise_id integer REFERENCES exercises (id) ON DELETE CASCADE,
    user_id integer REFERENCES users (id) ON DELETE CASCADE
  );

CREATE TABLE
  exercise_set (
    id SERIAL NOT NULL PRIMARY KEY,
    weight_lbs integer,
    reps integer,
    reps_actual integer DEFAULT 0,
    workout_exercise_id integer REFERENCES workout_exercises (id) ON DELETE CASCADE
  );

CREATE TABLE
  daily_calories (
    id SERIAL NOT NULL PRIMARY KEY,
    total_cals_burned integer DEFAULT 0,
    total_cals_gained integer DEFAULT 0,
    log_date DATE NOT NULL,
    user_id integer REFERENCES users (id) ON DELETE CASCADE
  );

  CREATE TABLE
  foods (
    id SERIAL NOT NULL PRIMARY KEY,
    food_name VARCHAR(255),
    food_id VARCHAR(255),
    measurements VARCHAR(2000),
    nutrients VARCHAR(500),
    food_image VARCHAR(255)
  );

CREATE TABLE
  nutrition_log (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id integer REFERENCES users (id),
    log_date DATE NOT NULL,
    food integer REFERENCES foods (id),
    portion real,
    consumed boolean DEFAULT false
  )



-- INSERT default muscle groups
INSERT INTO
  public.muscle_groups (id, muscle_group, photo_url)
VALUES
  (1, 'Biceps', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858736/Muscle%20Groups/Bicep_ypvub8.jpg'),
  (2, 'Triceps', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858733/Muscle%20Groups/Tricep_fcjqcg.jpg'),
  (3, 'Chest', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858221/Muscle%20Groups/Chest_czuxgj.jpg'),
  (4, 'Shoulders', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858221/Muscle%20Groups/Shoulders_qbnu7z.jpg'),
  (5, 'Back', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858731/Muscle%20Groups/Back_oqtrom.jpg'),
  (6, 'Hamstrings', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858221/Muscle%20Groups/Hamstrings_nc1o6h.jpg'),
  (7, 'Quads', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858221/Muscle%20Groups/Quads_dwm1ap.jpg'),
  (8, 'Glutes', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858221/Muscle%20Groups/Glutes_o04mqs.jpg'),
  (9, 'Calves', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858221/Muscle%20Groups/Calves_yhhyxm.jpg'),
  (10, 'Abs', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858735/Muscle%20Groups/Abs_s13jgg.jpg');

-- INSERT default exercises for Biceps
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
  ('DB Curls', 1),
  ('Hammer Curls', 1),
  ('Cable Curls', 1),
  ('Concentration Curls', 1),
  ('Preacher Curls', 1),
  ('DB Alternating Curls', 1),
  ('EZ Bar Curls', 1),
  ('Barbell Curls', 1);

-- INSERT default exercises for Triceps
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
  ('Skullcrusher', 2),
  ('DB Pull Overs', 2),
  ('Tricep Pushdown', 2),
  ('Dips', 2),
  ('Preacher Curls', 2),
  ('Tricep Kick Back', 2),
  ('Closegrip Bench', 2);

-- INSERT default exercises for Chest
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
('DB Decline Press', 3),
('Machine Incline Press', 3),
('Cable Cross Overs', 3),
('Barbell Bench Press', 3),
('Machine Chest Press', 3),
('DB Bench', 3),
('Incline Bench', 3),
('Decline Bench', 3),
('Cambered Bar Bench', 3),
('Machine Incline Bench', 3);

-- INSERT default exercises for Shoulders
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
('Shrugs', 4),
('Upright Rows', 4),
('DB Lateral Raise', 4),
('DB Front Raises', 4),
('DB Arnold Press', 4),
('Machine Military Press', 4),
('Push Press', 4),
('Face Pulls', 4),
('Cable Upright Rows', 4),
('DB Cuban Press', 4);

-- INSERT default exercises for Back
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
('Chest Supported Rows', 5),
('Inverted Rows', 5),
('DB Rows', 5),
('T-Bar Rows', 5),
('Lat Pulldowns', 5),
('Seated Rows', 5),
('Seal Rows', 5),
('Bent-over Rows', 5),
('Rack Pulls', 5),
('Pendlay Rows', 5);

-- INSERT default exercises for Hamstrings
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
('DB RDLs', 6),
('Seated Leg Curl', 6),
('Hamstring Curls', 6),
('Romanian Dealift', 6),
('Good Mornings', 6),
('Standing Leg Curl', 6),
('Stiff Leg Deadlift', 6),
('Single Leg Hip Thrust', 6),
('Landmine Single Leg RDL', 6),
('Reverse Hyperextension', 6);

-- INSERT default exercises for Quads
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
('Leg Extensions', 7),
('Split Squat (Quad Emphasis)', 7),
('Lunges', 7),
('Reverse Hack Squat', 7),
('Leg Press', 7),
('Belt Squats', 7),
('Goblet Squats', 7),
('Front Squats', 7),
('Barbell Squats', 7),
('Safety Bar Squats', 7);

-- INSERT default exercises for Glutes
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
('Barbell Glute Bridge', 8),
('Split Squat (Glutes Emphasis)', 8),
('Reverse Hyper', 8),
('Glute Kickbacks', 8),
('Smith Machine Hip Thrusts', 8),
('Smith Machine Reverse Lunge', 8),
('Lateral Lunge', 8);

-- INSERT default exercises for Calves
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
('Single Leg Calf Raise', 9),
('Bent Knee Calf Raises', 9),
('Calf Raises', 9),
('Barbell Seated Calf Raise', 9),
('Smith Machine Calf Raise', 9),
('Seated Calf Raise', 9);

-- INSERT default exercises for Abs
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
  ( 'Barbell Russian Twists', 10),
  ( 'Cable Crunch', 10),
  ( 'Hanging Leg Raises', 10),
  ( 'Weighted Situps', 10),
  ( 'Front Plank', 10);





-- NUTRITION --

INSERT INTO
  public.foods (food_name, food_id, nutrients, measurements, food_image)
VALUES
  ('Bacon Clubhouse Burger 9.7 oz (274 g)', 'food_bmyxrshbfao9s1amjrvhoauob6mo', '{
      "CAL": "740",
      "FAT": "41",
      "SFAT": "16",
      "TFAT": "1.5",
      "CHOL": "125",
      "SALT": "1480",
      "CARB": "51",
      "FBR": "4",
      "SGR": "14",
      "PRO": "40",
      "ITEM": "Bacon Clubhouse Burger 9.7 oz (274 g)",
      "CATEGORY": "BURGERSANDWICH"
  }', '[
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_unit",
                    "label": "Whole",
                    "weight": 131.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_sandwich",
                    "label": "Sandwich",
                    "weight": 131.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                    "label": "Gram",
                    "weight": 1.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_ounce",
                    "label": "Ounce",
                    "weight": 28.349523125
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_pound",
                    "label": "Pound",
                    "weight": 453.59237
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_kilogram",
                    "label": "Kilogram",
                    "weight": 1000.0
                }
            ]', 'imagegoes here'),
  ('Premium Grilled Chicken Bacon Clubhouse Sandwich 10 oz (285 g)', 'food_aqnly5xaq6rsv2bv0oi81bugldyr', '{
      "CAL": "640",
      "FAT": "41",
      "SFAT": "16",
      "TFAT": "1.5",
      "CHOL": "125",
      "SALT": "1480",
      "CARB": "51",
      "FBR": "4",
      "SGR": "14",
      "PRO": "40",
      "ITEM": "Premium Grilled Chicken Bacon Clubhouse Sandwich 10 oz (285 g)",
      "CATEGORY": "BURGERSANDWICH"
  }', '[
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_unit",
                    "label": "Whole",
                    "weight": 131.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_sandwich",
                    "label": "Sandwich",
                    "weight": 131.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                    "label": "Gram",
                    "weight": 1.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_ounce",
                    "label": "Ounce",
                    "weight": 28.349523125
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_pound",
                    "label": "Pound",
                    "weight": 453.59237
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_kilogram",
                    "label": "Kilogram",
                    "weight": 1000.0
                }
            ]', 'image goes here'),
  ('Premium Buttermilk Crispy Chicken Bacon Clubhouse Sandwich 10.1 oz (287 g)', 'food_a3ssteza84mhb2alnunwga2n6yt8', '{
      "CAL": "700",
      "FAT": "41",
      "SFAT": "16",
      "TFAT": "1.5",
      "CHOL": "125",
      "SALT": "1480",
      "CARB": "51",
      "FBR": "4",
      "SGR": "14",
      "PRO": "40",
      "ITEM": "Premium Buttermilk Crispy Chicken Bacon Clubhouse Sandwich 10.1 oz (287 g)",
      "CATEGORY": "BURGERSANDWICH"
  }', '[
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_unit",
                    "label": "Whole",
                    "weight": 131.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_sandwich",
                    "label": "Sandwich",
                    "weight": 131.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                    "label": "Gram",
                    "weight": 1.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_ounce",
                    "label": "Ounce",
                    "weight": 28.349523125
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_pound",
                    "label": "Pound",
                    "weight": 453.59237
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_kilogram",
                    "label": "Kilogram",
                    "weight": 1000.0
                }
            ]', 'image goes here');