import { Router } from "express";
import userRoutes from './userRoute.js'
const Routes = Router()

Routes.use('/user',userRoutes)

export default Routes