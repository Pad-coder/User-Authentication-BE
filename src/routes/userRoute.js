import { Router } from "express";
import userController from "../controller/userController.js";

const Routes = Router()

Routes.post('/signin',userController.signup)
Routes.post('/login',userController.login)
Routes.post('/forgot-password',userController.forgotPassword)
Routes.post('/verify-code',userController.verifyCode)

export default Routes