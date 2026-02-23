import { FieldValidationError, param, ValidationError, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from "./statuses";

export const idValidation = param('id').isString().trim().notEmpty();

export const inputValidationResultMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith((error: ValidationError) => {
        const expressError = error as FieldValidationError;
        return { field: expressError.path, message: expressError.msg };
    }).array({ onlyFirstError: true });

    if (errors.length > 0) {
        (res as any).status(HttpStatus.BadRequest).json({ errorsMessages: errors });
        return;
    }

    // Фикс для TS2349: This expression is not callable
    (next as any)();
};