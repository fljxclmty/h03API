import { body } from 'express-validator';



const nameValidation = body('name')
    .isString()
    .withMessage('name should be string')
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage('Length of name is not correct');

const descriptionValidation = body('description')
    .isString()
    .withMessage('Description should be string')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Length of description is not correct');

const websiteUrlValidation = body('websiteUrl')
    .isString()
    .withMessage('websiteUrl should be string')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Length of website url is not correct')
    .isURL()
    .withMessage('Must be a valid URL');


export const blogInputValidation = [
    nameValidation,
    descriptionValidation,
    websiteUrlValidation

];