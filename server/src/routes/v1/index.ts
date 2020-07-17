import express, { NextFunction } from "express";
import basic from "./initTest/helloworld";
import login from "./access/login";
import createRoom from "./rooms/createRoom";
import joinRoom from "./rooms/joinRoom";
import removeRoom from "./rooms/removeRoom";

const router = express.Router();

router.use("/", basic);
router.use("/login", login); //types [/login/basic]

router.use("/createRoom", createRoom);
router.use("/joinRoom", joinRoom);
router.use("/removeRoom", removeRoom);

export default router;
