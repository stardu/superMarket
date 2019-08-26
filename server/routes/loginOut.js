import express from 'express'
import User from '../controller/user'

let router = express.Router();

router.post('/', User.loginOut);

export default router