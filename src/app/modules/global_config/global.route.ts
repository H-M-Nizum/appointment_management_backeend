import express  from 'express';
import { GlobalController } from './global.controller';



const router = express.Router()


router.post("/create-global",GlobalController.createGlobalConfig);
router.get("/get-global",GlobalController.getGlobalConfig);


export const GlobalRoutes = router;