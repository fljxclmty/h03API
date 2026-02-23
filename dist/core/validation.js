"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationResultMiddleware = exports.createErrorMessages = exports.idValidation = void 0;
const express_validator_1 = require("express-validator");
const statuses_1 = require("./statuses");
exports.idValidation = (0, express_validator_1.param)('id')
    .isString()
    .withMessage('ID must be a string')
    .trim()
    .notEmpty()
    .withMessage('ID cannot be empty');
const createErrorMessages = (errors) => {
    return { errorsMessages: errors };
};
exports.createErrorMessages = createErrorMessages;
// Выносим маппинг ошибок в отдельную типизированную функцию
const formatErrors = (error) => {
    const expressError = error;
    return {
        field: expressError.path,
        message: expressError.msg,
    };
};
const inputValidationResultMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).formatWith(formatErrors).array({ onlyFirstError: true });
    if (errors.length > 0) {
        // Используем приведение к any для res, чтобы гарантировать наличие метода status на Vercel
        res.status(statuses_1.HttpStatus.BadRequest).json({ errorsMessages: errors });
        return;
    }
    // Вызываем next как функцию
    next();
};
exports.inputValidationResultMiddleware = inputValidationResultMiddleware;
