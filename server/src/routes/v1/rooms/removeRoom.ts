import express from "express";
import asyncHandler from "../../../helpers/asyncHandler";
import { RoomRepo } from "../../../database/repository/RoomRepo";
import schema from "./schema";
import validator from "../../../helpers/validator";
import { SucessMsgResponse } from "../../../core/ApiResponse";
import { BadRequestError } from "../../../core/ApiError";

const router = express.Router();

router.post(
  "/",
  validator(schema.remove),
  asyncHandler(async (req, res) => {
    const room = await RoomRepo.findRoomByName(req.body.name);
    if (!room) throw new BadRequestError("No Such Room registered");

    RoomRepo.removeRoomByName(req.body.name);

    new SucessMsgResponse("Room Removed").send(res);
  })
);

export default router;
