import { Router } from "express";
import { TvConfigController } from "./tvConfig.controller";


const router = Router();

router.post("/createOrUpdate-tvConfig",TvConfigController.createOrUpdateTvConfig);
router.get("/get-tvConfig",TvConfigController.getTvConfig);

export const TvConfigRoutes = router;