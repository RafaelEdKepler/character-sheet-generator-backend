import { Router } from 'express';
import { RaceController } from './controllers/RaceController';

const router = Router();

const raceController = new RaceController();

router.post("/race/create", raceController.create);
router.get("/race/list", raceController.list);


export default router;