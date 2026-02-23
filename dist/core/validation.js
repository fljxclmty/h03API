"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationResultMiddleware = exports.idValidation = void 0;
const express_validator_1 = require("express-validator");
const statuses_1 = require("./statuses");
exports.idValidation = (0, express_validator_1.param)('id').isString().trim().notEmpty();
const inputValidationResultMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).formatWith((error) => {
        const expressError = error;
        return { field: expressError.path, message: expressError.msg };
    }).array({ onlyFirstError: true });
    if (errors.length > 0) {
        res.status(statuses_1.HttpStatus.BadRequest).json({ errorsMessages: errors });
        return;
    }
    // Фикс для TS2349: This expression is not callable
    next();
};
exports.inputValidationResultMiddleware = inputValidationResultMiddleware;
