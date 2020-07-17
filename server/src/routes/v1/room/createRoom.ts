import express, { Router } from 'express';
import asyncHandler from '../../../helpers/asyncHandler';
import { RoomRepo } from '../../../database/repository/RoomRepo';
import { BadRequestError } from '../../../core/ApiError';
import bcrypt from 'bcryptjs';
import Room from '../../../database/model/Room';
import { SuccessResponse } from '../../../core/ApiResponse';
import Logger from '../../../core/Logger';


const router = express.Router();


router.post(
    '/',
    asyncHandler(async (req, res) => {
        if (!req.body.name || !req.body.password)
            throw new BadRequestError('no Room name or password supplied');


        const room = await RoomRepo.findRoomByName(req.body.name);
        if (room) throw new BadRequestError('Room already exists');

        const hashPwd = await bcrypt.hash(req.body.password, 10);
        const newRoom = {
            name: req.body.name,
            pwd: hashPwd
        }
        const { room: createdRoom } = await RoomRepo.create(newRoom as unknown as Room);
        new SuccessResponse('Room SuccessFully Created', {
            room: createdRoom
        }).send(res);
    })
)


export default router;