"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const validation_1 = require("../../core/validation");
const super_admin_guard_middleware_1 = require("../../core/super-admin-guard-middleware");
const post_input_validation_1 = require("../validation/post-input-validation");
const post_handlers_1 = require("./post-handlers");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter
    .get('', post_handlers_1.getPostsHandler)
    .get('/:id', validation_1.idValidation, validation_1.inputValidationResultMiddleware, post_handlers_1.getPostByIdHandler)
    .post('', super_admin_guard_middleware_1.superAdminGuardMiddleware, // 1. Сначала проверяем права
post_input_validation_1.postInputValidation, // 2. Потом валидируем тело
validation_1.inputValidationResultMiddleware, post_handlers_1.createPostHandler)
    .put('/:id', super_admin_guard_middleware_1.superAdminGuardMiddleware, // 1. Сначала права
validation_1.idValidation, // 2. Потом ID из параметров
post_input_validation_1.postInputValidation, // 3. Потом тело запроса
validation_1.inputValidationResultMiddleware, post_handlers_1.updatePostHandler)
    .delete('/:id', super_admin_guard_middleware_1.superAdminGuardMiddleware, // 1. Сначала права
validation_1.idValidation, // 2. Потом ID
validation_1.inputValidationResultMiddleware, post_handlers_1.deletePostHandler);
