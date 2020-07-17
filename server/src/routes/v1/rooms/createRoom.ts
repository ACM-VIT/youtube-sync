import express from "express";
import validator from "../../../helpers/validator";
import schema from "./schema";
import asyncHandler from "../../../helpers/asyncHandler";
import { RoomRepo } from "../../../database/repository/RoomRepo";
import { BadRequestError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
const router = express.Router();

router.post(
  "/",
  validator(schema.room),
  asyncHandler(async (req, res) => {
    const room = await RoomRepo.findRoomByName(req.body.name);
    if (room)
      throw new BadRequestError(
        "Room Name already exists,Try to Join a Room instead"
      );

    const { room: createdRoom } = await RoomRepo.create(
      req.body.name,
      req.body.pwd
    );
    new SuccessResponse("Room Creation Successfull", {
      room: createdRoom,
    }).send(res);
  })
);

export default router;
