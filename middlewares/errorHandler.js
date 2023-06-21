const errorHandler = function (err, req, res, next) {
  res.status(200).json({
    error: err.message,
  });
};

module.exports = errorHandler;
