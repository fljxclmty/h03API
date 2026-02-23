import { Router } from 'express';
import { postsHandlers } from './post-handlers';
import {superAdminGuardMiddleware} from "../../core/super-admin-guard-middleware";
import {idValidation, inputValidationResultMiddleware} from "../../core/validation";
import {postInputValidation} from "../validation/post-input-validation";


export const postsRouter = Router();

postsRouter.get('/', postsHandlers.getAll);

postsRouter.get('/:id',
    idValidation,
    inputValidationResultMiddleware,
    postsHandlers.getOne
);

postsRouter.post('/',
    superAdminGuardMiddleware,
    ...postInputValidation,
    inputValidationResultMiddleware,
    postsHandlers.create
);

postsRouter.put('/:id',
    superAdminGuardMiddleware,
    idValidation,
    ...postInputValidation,
    inputValidationResultMiddleware,
    postsHandlers.update
);

postsRouter.delete('/:id',
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    postsHandlers.delete
);