import { Router } from 'express';
import { blogsHandlers } from './blogs-handlers';
import {superAdminGuardMiddleware} from "../../core/super-admin-guard-middleware";
import {idValidation, inputValidationResultMiddleware} from "../../core/validation";
import {blogInputValidation} from "../validation/blog-input-validation";


export const blogsRouter = Router();

blogsRouter.get('/', blogsHandlers.getAll);

blogsRouter.get('/:id',
    idValidation,
    inputValidationResultMiddleware,
    blogsHandlers.getOne
);

blogsRouter.post('/',
    superAdminGuardMiddleware,
    ...blogInputValidation, // Разворачиваем массив правил
    inputValidationResultMiddleware, // Собираем ошибки
    blogsHandlers.create
);

blogsRouter.put('/:id',
    superAdminGuardMiddleware,
    idValidation,
    ...blogInputValidation,
    inputValidationResultMiddleware,
    blogsHandlers.update
);

blogsRouter.delete('/:id',
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    blogsHandlers.delete
);