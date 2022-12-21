const { exerciseList } = require('../__mocks__/exercise');
const { query } = require('../db');
const axios = require('axios');
const request = require('supertest');
const app = require('../app');
const db = require('../db');

describe('Exercise API', () => {
  afterAll(async () => {
    const username = 'testUser';
    const params = [username];

    const query1 = `DELETE FROM public.users WHERE username=$1`;

    try {
      await query(query1, params);
    } catch (err) {
      throw err;
    }
  });

  afterAll(async () => {
    await db.end();
  });

  beforeAll(async () => {
    const username = 'testUser';
    const params = [username];

    const query1 = `INSERT INTO
    public.users (
      firstname,
      lastname,
      username,
      password,
      weight_lbs,
      height_inches,
      sex
    )
  VALUES
    ('John','Doe',$1,'123', 335, 81,'male')`;

    try {
      await query(query1, params);
    } catch (err) {
      throw err;
    }

    //inserting custom exercises for testUser
    const query2 = `INSERT INTO
    public.exercises (exercise, muscle_group_id, user_id)
    VALUES
    ('Farmers walk', 5, (SELECT id from users WHERE username=$1)),
    ('Car Deadlift', 6, (SELECT id from users WHERE username=$1)),
    ('Sled Pull', 5, (SELECT id from users WHERE username=$1)),
    ('Monster DB Press', 4, (SELECT id from users WHERE username=$1))`;

    try {
      await query(query2, params);
      console.log('test2');
    } catch (err) {
      throw err;
    }
  });

  describe('GET ', () => {
    describe('when a user searches for default exercises', () => {
      describe('a get request is made to retrieve a list of default exercises along with a list of default muscle groups', () => {
        it('should respond with 200 status', async () => {
          const res = await request(app).get('/exercise/default/list');

          expect(res.statusCode).toBe(200);
        });

        it('should return default exercise list', async () => {
          const res = await request(app).get('/exercise/default/list');

          expect(res.body.exercises).toEqual(
            expect.arrayContaining(exerciseList.exercises)
          );
        });

        it('should return muscle groups list for default exercises', async () => {
          const res = await request(app).get('/exercise/default/list');

          expect(res.body.muscle_groups).toEqual(exerciseList.muscle_groups);
        });
      });
    });

    describe('when a user searches for custom exercises', () => {
      describe('a get request is made to retrieve a list of custom exercises', () => {
        it('should retrieve custom exercises from a user', async () => {
          const username = 'testUser';
          const res = await request(app).get(
            `/exercise/custom/list?username=${username}`
          );

          console.log(res.body);
          expect(res.statusCode).toBe(200);
          expect(res.body).not.toBeUndefined();
          expect(res.body[0]).toHaveProperty('exercise');

          // ****** need better assertion ******* ///
        });
      });
    });

    //   describe('when a user navigates to exercise page', () => {
    //     describe('a get request is made to retrieve all the exercises in the user workout for that day', () => {
    //       beforeEach(async () => {
    //         const username = 'testUser';
    //         const params = [username];

    //         const query1 = `INSERT INTO public.workout_exercises(
    //           log_date, exercise_id, user_id)
    //           VALUES ('2022-12-13',
    //               (SELECT id FROM exercises WHERE exercise='DB Alternating Curls'),
    //               (SELECT id FROM users WHERE username=$1)),('2022-12-13',
    //               (SELECT id FROM exercises WHERE exercise='Barbell Russian Twists'),
    //               (SELECT id FROM users WHERE username=$1)),('2022-12-13',
    //               (SELECT id FROM exercises WHERE exercise='Smith Machine Reverse Lunge'),
    //               (SELECT id FROM users WHERE username=$1))`;

    //         try {
    //           await query(query1, params);
    //         } catch (err) {
    //           throw err;
    //         }
    //       });

    //       it('should retrieve workout execises', async () => {
    //         const username = 'testUser';
    //         const log_date = '2022-12-13';
    //         const res = await request(app).get(
    //           `/exercise/custom/list?username=${username}`
    //         );

    //         expect(res.statusCode).toBe(200);
    //         expect(res.body).not.toBeUndefined();
    //         expect(res.body[0]).toHaveProperty('exercise');

    //         // ****** need better assertion ******* ///
    //       });
    //     });
    //   });
    // });

    // describe('POST ', () => {
    //   describe('when a user creates a new custom exercise', () => {
    //     describe('a post request is made to create a new custom exercise for that user', () => {
    //       afterEach(async () => {
    //         const queryString = `DELETE FROM public.exercises
    //         WHERE exercises.id=(SELECT max(id) FROM exercises)`;

    //         try {
    //           await query(queryString);
    //         } catch (err) {
    //           throw err;
    //         }
    //       });

    //       it('should create a new custom exercise for a user', async () => {
    //         const username = 'testUser';
    //         const custom_exercise = 'Log Presses';
    //         const muscle_group = 'Shoulders'; //note: this is a default value stored in the muscle_groups table
    //         const res = await request(app).post(
    //           `/exercise/custom/create?username=${username}&custom_exercise=${custom_exercise}&muscle_group=${muscle_group}`
    //         );

    //         const queryString = `SELECT exercises.id AS exercise_id, exercise, muscle_group_id, muscle_group FROM exercises
    //         JOIN muscle_groups ON exercises.muscle_group_id=muscle_groups.id
    //         WHERE user_id=(SELECT id FROM users WHERE username=$1)
    //         AND exercises.id=(SELECT max(exercises.id) FROM exercises)`;
    //         const params = [username];

    //         let retriveFromdb;
    //         try {
    //           retriveFromdb = await query(queryString, params);
    //         } catch (err) {
    //           throw err;
    //         }

    //         expect(res.statusCode).toBe(201);
    //         expect(retriveFromdb.rows[0].exercise).toEqual('Log Presses');
    //       });
    //     });
    //   });
    // });

    // describe('DELETE', () => {
    //   describe('when a user updates a custom exercise', () => {
    //     beforeAll(async () => {
    //       //insert custom exercise into workout before all
    //       const log_date = '2022-12-14';
    //       const custom_exercise = 'Car Deadlift';
    //       const username = 'testUser';

    //       const params = [log_date, custom_exercise, username];

    //       const query1 = `INSERT INTO public.workout_exercises(
    //         log_date, exercise_id, user_id)
    //         VALUES ($1,
    //              (SELECT id FROM exercises WHERE exercises.exercise=$2),
    //              (SELECT id FROM users WHERE users.username=$3))`;

    //       try {
    //         await query(query1, params);
    //       } catch (err) {
    //         throw err;
    //       }
    //     });
    //     describe('a put request is made to delete the custom exercise', () => {
    //       it('should delete custom exercise', async () => {
    //         //note: custom exercises were inserted in very first beforeAll
    //         const username = 'testUser';
    //         const custom_exercise = 'Car Deadlift';
    //         const res = await request(app).delete(
    //           `/exercise/custom/create?username=${username}&custom_exercise=${custom_exercise}`
    //         );

    //         const params = [username];

    //         //check exercise table for custom exercise
    //         const query1 = `SELECT exercise, username
    //         FROM public.exercises
    //         JOIN users ON exercises.user_id=users.id
    //         WHERE users.username=$1`;

    //         let retrieveCustomAfterDelete;
    //         try {
    //           retrieveCustomAfterDelete = await query(query1, params);
    //         } catch (err) {
    //           throw err;
    //         }
    //         expect(retrieveCustomAfterDelete.rows).toEqual([]);
    //         expect(res.body.length).toBeLessThan(4);
    //       });

    //       it('should delete custom exercise from a workout', async () => {
    //         //insert custom exercise into workout before all

    //         const log_date = '2022-12-14';
    //         const custom_exercise = 'Car Deadlift';
    //         const username = 'testUser';

    //         const params = [log_date, custom_exercise, username];

    //         //retrieve workout and check if exercise in the workout
    //         const query1 = `SELECT log_date, exercises.exercise, users.username
    //         FROM public.workout_exercises
    //         JOIN exercises ON workout_exercises.exercise_id=exercises.id
    //         JOIN users ON workout_exercises.user_id=users.id
    //         WHERE log_date=$1 AND exercises.exercise=$2
    //         AND users.username=$3`;

    //         let retrieveCustomAfterDelete;
    //         try {
    //           retrieveCustomAfterDelete = await query(query1, params);
    //         } catch (err) {
    //           throw err;
    //         }
    //         expect(retrieveCustomAfterDelete.rows).toEqual([]);
    //         expect(res.body.length).toEqual(0);
    //       });
    //     });
    //   });
  });
});
