import express from "express";
import validator from "../../../helpers/validator";
import schema from "./schema";
import asyncHandler from "../../../helpers/asyncHandler";
import { RoomRepo } from "../../../database/repository/RoomRepo";
import { BadRequestError, AuthFailureError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import bcrypt from "bcryptjs";
const router = express.Router();

router.post(
  "/",
  validator(schema.room),
  asyncHandler(async (req, res) => {
    const room = await RoomRepo.findRoomByName(req.body.name);
    if (!room) throw new BadRequestError("No Such Room registered");

    const hashPwd = await bcrypt.compare(req.body.pwd, room.pwd as string);
    if (!hashPwd)
      throw new AuthFailureError("Room Password given is incorrect");

    new SuccessResponse("Joined Room Successfully", {
      room,
    }).send(res);
  })
);

export default router;
