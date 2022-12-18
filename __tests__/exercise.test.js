// const request = require('supertest');
const axios = require('axios');
const { exerciseList } = require('../__mocks__/exercise');
const request = require('supertest');
const app = require('../app');

describe('Exercise API', () => {
  describe('GET ', () => {
    describe('when user searches for default exercises', () => {
      describe('should return list of defualt exercises with list of muscle groups', () => {
        it('should respond with 200 status', async () => {
          const res = await request(app).get('/exercise/default/list');

          expect(res.statusCode).toBe(200);
        });

        //   it('should return default exercise list', async () => {
        //     const res = await request(app).get('/exercise/default/list');

        //     expect(res.body.exercises).toEqual(exerciseList.exercises);
        //   });

        //   it('should return muscle groups list for default exercises', async () => {
        //     const res = await request(app).get('/exercise/default/list');

        //     expect(res.body.muscle_groups).toEqual(exerciseList.muscle_groups);
        //   });

        it('test failure', async () => {
          expect().toEqual([]);
        });
      });
    });
  });
});
