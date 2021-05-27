import { Router } from 'express';
import { RaceController } from './controllers/RaceController';
import { RaceHabilityController } from './controllers/RaceHabilityController';
import { PreRequesitRaceHabilityController } from './controllers/PreRequesitHabilityRaceController';
import { BenefitRaceHabilityController } from './controllers/BenefitRaceHabilityController';
import { ClassController } from './controllers/ClassController';
import { ClassHabilityController } from './controllers/ClassHabilityController';
import { PreRequesitClassHabilityController } from './controllers/PreRequesitHabilityClassController';
import { BenefitClassHabilityController } from './controllers/BenefitClassHabilityController';
import { EquipmentController } from './controllers/EquipmentController';
import { PreRequesitEquipmentController } from './controllers/PreRequesitEquipmentController';
import { BenefitEquipmentController } from './controllers/BenefitEquipmentController';
import { MagicController } from './controllers/MagicController';
import { PreRequesitMagicController } from './controllers/PreRequesitMagicController';
import { BenefitMagicController } from './controllers/BenefitMagicController';
import { TalentController } from './controllers/TalentController';
import { PreRequesitTalentController } from './controllers/PreRequesitTalentController';
import { BenefitTalentController } from './controllers/BenefitTalentController';

const router = Router();

const raceController = new RaceController();
const raceHabilityController = new RaceHabilityController();
const benefitRaceHabilityController = new BenefitRaceHabilityController();
const preRequesitRaceHabilityController = new PreRequesitRaceHabilityController();
const classController = new ClassController();
const classHabilityController = new ClassHabilityController();
const benefitClassHabilityController = new BenefitClassHabilityController();
const preRequesitHabilityClassController = new PreRequesitClassHabilityController();
const equipmentController = new EquipmentController();
const benefitEquipmentController = new BenefitEquipmentController();
const preRequesiteEquipmentController = new PreRequesitEquipmentController();
const magicController = new MagicController();
const benefitMagicController = new BenefitMagicController();
const preRequesiteMagicController = new PreRequesitMagicController();
const talentController = new TalentController();
const benefitTalentController = new BenefitTalentController();
const preRequesitTalentController = new PreRequesitTalentController();

router.post("/race/create", raceController.create);
router.get("/race/list", raceController.list);

router.post("/race/hability/create", raceHabilityController.createWithDependencies);
router.post("/race/hability/create-one", raceHabilityController.create);
router.get("/race/hability/list", raceHabilityController.list);
router.post("/race/hability/list-with-dependencies", raceHabilityController.listWithDependencies);

router.post("/race/hability/benefit/create", benefitRaceHabilityController.create);
router.get("/race/hability/benefit/list", benefitRaceHabilityController.list);

router.post("/race/hability/pre-requesite/create", preRequesitRaceHabilityController.create);
router.get("/race/hability/pre-requesite/list", preRequesitRaceHabilityController.list);

router.post("/class/create", classController.create);
router.get("/class/list", classController.list);

router.post("/class/hability/create", classHabilityController.createWithDependencies);
router.post("/class/hability/create-one", classHabilityController.createWithDependencies);
router.get("/class/hability/list", classHabilityController.list);
router.post("/class/hability/list-all-with-dependencies", classHabilityController.listWithDependencies);

router.post("/class/hability/benefit/create", benefitClassHabilityController.create);
router.get("/class/hability/benefit/list", benefitClassHabilityController.list);

router.post("/class/hability/pre-requesit/create", preRequesitHabilityClassController.create);
router.get("/class/hability/pre-requesit/list", preRequesitHabilityClassController.list);

router.post("/equipment/create", equipmentController.createWithDependencies);
router.post("/equipment/create-one", equipmentController.createWithDependencies);
router.get("/equipment/list", equipmentController.list);
router.get("/equipment/list-all-with-dependencies", equipmentController.listAllWithDependencies);
router.post("/equipment/list-with-dependencies", equipmentController.listWithDependencies);

router.post("/equipment/benefit/create", benefitEquipmentController.create);
router.get("/equipment/benefit/list", benefitEquipmentController.list);

router.post("/equipment/pre-requesite/create", preRequesiteEquipmentController.create);
router.get("/equipment/pre-requesite/list", preRequesiteEquipmentController.list);

router.post("/magic/create", magicController.createWithDependencies);
router.post("/magic/create-one", magicController.createWithDependencies);
router.get("/magic/list", magicController.list);
router.get("/magic/list-with-dependencies", magicController.listWithDependencies);
router.post("/magic/list-all-with-dependencies", magicController.listAllWithDependencies);

router.post("/magic/benefit/create", benefitMagicController.create);
router.get("/magic/benefit/list", benefitMagicController.list);

router.post("/magic/pre-requesite/create", preRequesiteMagicController.create);
router.get("/magic/pre-requesite/list", preRequesiteMagicController.list);

router.post("/talent/create", talentController.createWithDependencies);
router.post("/talent/create-one", talentController.createWithDependencies);
router.get("/talent/list", talentController.list);
router.get("/talent/list-with-dependencies", talentController.listWithDependencies);
router.post("/talent/list-all-with-dependencies", talentController.listAllWithDependencies);

router.post("/talent/benefit/create", benefitTalentController.create);
router.get("/talent/benefit/list", benefitTalentController.list);

router.post("/talent/pre-requesite/create", preRequesitTalentController.create);
router.get("/talent/pre-requesite/list", preRequesitTalentController.list);

export default router;