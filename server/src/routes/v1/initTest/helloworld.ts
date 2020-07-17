import express, { Request, Response } from 'express';
import asyncHandler from '../../../helpers/asyncHandler';
import { SucessMsgResponse } from '../../../core/ApiResponse';

const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        new SucessMsgResponse('Hello World').send(res);
    }),
);

export default router;