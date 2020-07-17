import express from "express";
import asyncHandler from "../../../helpers/asyncHandler";
import { UserRepo } from "../../../database/repository/UserRepo";
import { BadRequestError } from "../../../core/ApiError";
import User from "../../../database/model/User";
import { SuccessResponse, NotFoundResponse } from "../../../core/ApiResponse";
import Logger from "../../../core/Logger";
import validator from "../../../helpers/validator";
import schema from "./schema";

const router = express.Router();

router.post(
  "/basic",
  validator(schema.login),
  asyncHandler(async (req, res) => {
    const user = await UserRepo.findByName(req.body.name);
    if (user) {
      new SuccessResponse("Signin Successful", {
        user,
      }).send(res);
    } else {
      const { user: createdUser } = await UserRepo.create(req.body.name);
      new SuccessResponse("Signup Successful", {
        user: createdUser,
      }).send(res);
    }
  })
);

export default router;
