//add your controllers here
//make sure you do error handling like so
//if you take care of errors like the below example, the error middleware will take care of the error for you

module.exports = {
  test: async (req, res, next) => {
    try {
      res.send('hi');
    } catch (err) {
      next(err);
    }
  },
};
