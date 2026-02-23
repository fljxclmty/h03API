import {Router} from "express";
import {
    createBlogHandler,
    deleteBlogHandler,
    getBlogByIdHandler,
    getBlogsHandler,
    updateBlogHandler
} from "./blogs-handlers";
import {idValidation, inputValidationResultMiddleware} from "../../core/validation";
import {superAdminGuardMiddleware} from "../../core/super-admin-guard-middleware";
import {blogInputValidation} from "../validation/blog-input-validation";

export const blogsRouter = Router({});

blogsRouter
    .get('', getBlogsHandler)
    .get('/:id', idValidation, inputValidationResultMiddleware, getBlogByIdHandler)
    .post('',
        superAdminGuardMiddleware,
        blogInputValidation,
        inputValidationResultMiddleware,
        createBlogHandler
    )
    .put('/:id',
        superAdminGuardMiddleware,
        idValidation,
        blogInputValidation,
        inputValidationResultMiddleware,
        updateBlogHandler
    )
    .delete('/:id',
        superAdminGuardMiddleware,
        idValidation,
        inputValidationResultMiddleware,
        deleteBlogHandler
    );
