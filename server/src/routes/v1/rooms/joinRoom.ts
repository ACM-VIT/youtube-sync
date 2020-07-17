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
    if (!room) throw new BadRequestError("No Such Room registered");

    new SuccessResponse("Joined Room Successfully", {
      room,
    }).send(res);
  })
);

export default router;
