import { FieldValidationError, param, ValidationError, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from "./statuses";

export const idValidation = param('id')
    .isString()
    .withMessage('ID must be a string')
    .trim()
    .notEmpty()
    .withMessage('ID cannot be empty');

export type FieldError = {
    message: string;
    field: string;
};

export type APIErrorResult = {
    errorsMessages: FieldError[];
};

export const createErrorMessages = (errors: FieldError[]): APIErrorResult => {
    return { errorsMessages: errors };
};

// Выносим маппинг ошибок в отдельную типизированную функцию
const formatErrors = (error: ValidationError): FieldError => {
    const expressError = error as FieldValidationError;
    return {
        field: expressError.path,
        message: expressError.msg,
    };
};

export const inputValidationResultMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const errors = validationResult(req).formatWith(formatErrors).array({ onlyFirstError: true });

    if (errors.length > 0) {
        // Используем приведение к any для res, чтобы гарантировать наличие метода status на Vercel
        (res as any).status(HttpStatus.BadRequest).json({ errorsMessages: errors });
        return;
    }

    // Вызываем next как функцию
    next();
};