"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_handlers_1 = require("./blogs-handlers");
const super_admin_guard_middleware_1 = require("../../core/super-admin-guard-middleware");
const validation_1 = require("../../core/validation");
const blog_input_validation_1 = require("../validation/blog-input-validation");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', blogs_handlers_1.blogsHandlers.getAll);
exports.blogsRouter.get('/:id', validation_1.idValidation, validation_1.inputValidationResultMiddleware, blogs_handlers_1.blogsHandlers.getOne);
exports.blogsRouter.post('/', super_admin_guard_middleware_1.superAdminGuardMiddleware, ...blog_input_validation_1.blogInputValidation, // Разворачиваем массив правил
validation_1.inputValidationResultMiddleware, // Собираем ошибки
blogs_handlers_1.blogsHandlers.create);
exports.blogsRouter.put('/:id', super_admin_guard_middleware_1.superAdminGuardMiddleware, validation_1.idValidation, ...blog_input_validation_1.blogInputValidation, validation_1.inputValidationResultMiddleware, blogs_handlers_1.blogsHandlers.update);
exports.blogsRouter.delete('/:id', super_admin_guard_middleware_1.superAdminGuardMiddleware, validation_1.idValidation, validation_1.inputValidationResultMiddleware, blogs_handlers_1.blogsHandlers.delete);
