import express, { NextFunction } from "express";
import basic from "./initTest/helloworld";
import login from "./access/login";
import { NotFoundResponse } from "../../core/ApiResponse";
import createRoom from "./room/createRoom";

const router = express.Router();

router.use("/", basic);
router.use("/login", login);

router.use("/createRoom", createRoom);

export default router;
