import express from 'express'
import User from '../controller/user'

let router = express.Router();

router.post('/', User.register);

export default router