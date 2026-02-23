"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInputValidation = void 0;
const express_validator_1 = require("express-validator");
const titleValidation = (0, express_validator_1.body)('title')
    .isString()
    .withMessage('title should be string')
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('Length of title is not correct');
const shortDescriptionValidation = (0, express_validator_1.body)('shortDescription')
    .isString()
    .withMessage('Short description should be string')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Length of short description is not correct');
const contentValidation = (0, express_validator_1.body)('content')
    .isString()
    .withMessage('Content should be string')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Length of content is not correct');
const blogIdValidation = (0, express_validator_1.body)('blogId')
    .isString()
    .withMessage('Blog ID should be string');
exports.postInputValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation
];
