import {Router} from "express";
import {idValidation, inputValidationResultMiddleware} from "../../core/validation";
import {superAdminGuardMiddleware} from "../../core/super-admin-guard-middleware";
import {postInputValidation} from "../validation/post-input-validation";
import {
    createPostHandler,
    deletePostHandler,
    getPostByIdHandler,
    getPostsHandler,
    updatePostHandler
} from "./post-handlers";


export const postsRouter = Router({});


postsRouter
    .get('', getPostsHandler)

    .get('/:id',
        idValidation,
        inputValidationResultMiddleware,
        getPostByIdHandler
    )

    .post('',
        superAdminGuardMiddleware, // 1. Сначала проверяем права
        postInputValidation,       // 2. Потом валидируем тело
        inputValidationResultMiddleware,
        createPostHandler,
    )

    .put('/:id',
        superAdminGuardMiddleware, // 1. Сначала права
        idValidation,              // 2. Потом ID из параметров
        postInputValidation,       // 3. Потом тело запроса
        inputValidationResultMiddleware,
        updatePostHandler,
    )

    .delete('/:id',
        superAdminGuardMiddleware, // 1. Сначала права
        idValidation,              // 2. Потом ID
        inputValidationResultMiddleware,
        deletePostHandler,
    );