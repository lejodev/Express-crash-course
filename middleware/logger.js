const logger = (req, res, next) => {
    console.log(`In middleware ${req.method}`);
    next();
};

module.exports = logger;