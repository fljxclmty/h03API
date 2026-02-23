"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_handlers_1 = require("./blogs-handlers");
const validation_1 = require("../../core/validation");
const super_admin_guard_middleware_1 = require("../../core/super-admin-guard-middleware");
const blog_input_validation_1 = require("../validation/blog-input-validation");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter
    .get('', blogs_handlers_1.getBlogsHandler)
    .get('/:id', validation_1.idValidation, validation_1.inputValidationResultMiddleware, blogs_handlers_1.getBlogByIdHandler)
    .post('', super_admin_guard_middleware_1.superAdminGuardMiddleware, blog_input_validation_1.blogInputValidation, validation_1.inputValidationResultMiddleware, blogs_handlers_1.createBlogHandler)
    .put('/:id', super_admin_guard_middleware_1.superAdminGuardMiddleware, validation_1.idValidation, blog_input_validation_1.blogInputValidation, validation_1.inputValidationResultMiddleware, blogs_handlers_1.updateBlogHandler)
    .delete('/:id', super_admin_guard_middleware_1.superAdminGuardMiddleware, validation_1.idValidation, validation_1.inputValidationResultMiddleware, blogs_handlers_1.deleteBlogHandler);
