class ForbiddenError extends Error {
  status = 403;
  constructor(message = "ForbiddenError") {
    super(message);
  }
}

module.exports = ForbiddenError;
