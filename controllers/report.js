//add your controllers here
//make sure you do error handling like so
//if you take care of errors like the below example, the error middleware will take care of the error for you

const {
  getTest,
  getCalGained,
  getCalBurned,
  getExerciseReports} = require('../model/report');

module.exports = {
  test: (req, res, next) => {
    try {
      res.send({string: 'report test'});
    } catch (err) {
      next(err);
    }
  },
  dbTest: async (req, res, next) => {
    try {
      let result = await getTest();
      res.status(200).send(result.rows[0].current_date);
    } catch (err) {
      next(err);
    }
  },
  getReportData: async (req, res, next) => {
    let [id, date] = [req.params.userId, req.params.date];
    try {
      let [calGained, calBurned, exerciseReports] = await Promise.all([
        getCalGained(id, date),
        getCalBurned(id, date),
        getExerciseReports(id, date)
      ]);
      let result = {calGained, calBurned, exerciseReports};
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
};
