
import express from 'express';
import asyncHandler from "../../../helpers/asyncHandler";
import { UserRepo } from '../../../database/repository/UserRepo';
import { BadRequestError } from '../../../core/ApiError';
import User from '../../../database/model/User';
import { SuccessResponse, NotFoundResponse } from '../../../core/ApiResponse';
import Logger from '../../../core/Logger';

const router = express.Router();

router.post(
    '/basic',
    asyncHandler(async (req, res) => {
        if (!req.body.name) throw new BadRequestError();

        const user = await UserRepo.findByName(req.body.name);
        if (user) throw new BadRequestError('User already exists');

        const { user: createdUser } = await UserRepo.create(req.body.name);
        new SuccessResponse('Signup Successful', {
            user: createdUser
        }).send(res);
    })
);



export default router