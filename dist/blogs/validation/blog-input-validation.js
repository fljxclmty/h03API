"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogInputValidation = void 0;
const express_validator_1 = require("express-validator");
const nameValidation = (0, express_validator_1.body)('name')
    .isString()
    .withMessage('name should be string')
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage('Length of name is not correct');
const descriptionValidation = (0, express_validator_1.body)('description')
    .isString()
    .withMessage('Description should be string')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Length of description is not correct');
const websiteUrlValidation = (0, express_validator_1.body)('websiteUrl')
    .isString()
    .withMessage('websiteUrl should be string')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Length of website url is not correct')
    .isURL()
    .withMessage('Must be a valid URL');
exports.blogInputValidation = [
    nameValidation,
    descriptionValidation,
    websiteUrlValidation
];
