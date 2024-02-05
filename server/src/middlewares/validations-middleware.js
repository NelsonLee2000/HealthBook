const {validationResult} = require('express-validator');

// middleware gathers all errors and returns them is present 
exports.validationsMiddleware = (req, res, next) => {
    let errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        })
    }
    next ()
}