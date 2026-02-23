import { body } from 'express-validator';



const titleValidation = body('title')
    .isString()
    .withMessage('title should be string')
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('Length of title is not correct');

const shortDescriptionValidation = body('shortDescription')
    .isString()
    .withMessage('Short description should be string')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Length of short description is not correct');

const contentValidation = body('content')
    .isString()
    .withMessage('Content should be string')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Length of content is not correct');

const blogIdValidation = body ('blogId')
    .isString()
    .withMessage('Blog ID should be string');




export const postInputValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation

];