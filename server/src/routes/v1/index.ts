import express, { NextFunction } from "express";
import basic from "./initTest/helloworld";
import login from "./access/login";
import createRoom from "./rooms/createRoom";
import joinRoom from "./rooms/joinRoom";

const router = express.Router();

router.use("/", basic);
router.use("/login", login);

router.use("/createRoom", createRoom);
router.use("/joinRoom", joinRoom);

export default router;
