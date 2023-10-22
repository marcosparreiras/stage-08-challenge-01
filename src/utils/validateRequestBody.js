const AppError = require('./AppError');

function validateResquestBody(requestedBodyParams, requestBody) {
    if (!Array.isArray(requestedBodyParams)) {
        throw new Error(`${requestedBodyParams} argument must be array`);
    }
    requestedBodyParams.forEach((param) => {
        const validateRequest = Object.keys(requestBody).includes(param);
        if (!validateRequest) {
            throw new AppError(`${param} is missing`);
        }
    });
}

module.exports = validateResquestBody;
