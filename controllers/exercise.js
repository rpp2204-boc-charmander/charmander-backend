//add your controllers here
//make sure you do error handling like so
//if you take care of errors like the below example, the error middleware will take care of the error for you
const {
  getDefaultExercisesFromDB,
  getMuscleGroupsFromDB,
  getUserExercisesFromDB,
} = require('../model/exercise');

module.exports = {
  getDefaultExercises: async (req, res, next) => {
    try {
      //doing promise all to batch these async functions so they run in parallel instead of one after the other. This is for performance optimization

      const [exercises, muscle_groups] = await Promise.all([
        getDefaultExercisesFromDB(next),
        getMuscleGroupsFromDB(next),
      ]);

      const result = { exercises, muscle_groups };

      await res.status(200).send(result);
      next();
    } catch (err) {
      next(err);
    }
  },

  getUserExercises: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      const result = await getUserExercisesFromDB(user_id, next);

      await res.status(200).send(result);
      next();
    } catch (err) {
      next(err);
    }
  },
};
