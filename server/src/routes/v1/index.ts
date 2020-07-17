import express from 'express';
import basic from './initTest/helloworld';
import login from './access/login';
import { NotFoundResponse } from '../../core/ApiResponse';
import createRoom from './room/createRoom';

const router = express.Router();


router.use('/', basic);
router.use('/login', login);

router.use('/createRoom', createRoom);

router.use((req, res, next) => next(new NotFoundResponse()));




export default router;