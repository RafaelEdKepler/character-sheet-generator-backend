import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { BenefitEquipmentRepository } from '../repositories/BenefitEquipmentRepository';
import { EquipmentRepository } from '../repositories/EquipmentRepository';
import { PreRequisiteEquipmentRepository } from '../repositories/PreRequesitEquipmentRepository';
import { CharacteristicInterface } from '../utils/interfaces';
import { BenefitEquipmentController } from './BenefitEquipmentController';
import { PreRequesitEquipmentController } from './PreRequesitEquipmentController';


class EquipmentController {

    async create(request: Request, response: Response) {
        const equipmentRepository = getCustomRepository(EquipmentRepository);

        const { name, description } = request.body;
        const equipment = equipmentRepository.create({
            name, description
        })

        await equipmentRepository.save(equipment);

        return response.json({
            message: "Equipamento foi criado com sucesso!"
        })
    }

    async createWithDependencies(request: Request, response: Response) {
        const equipmentRepository = getCustomRepository(EquipmentRepository);

        const { name, description, features } = request.body;
        const equipment = equipmentRepository.create({
            name, description
        })

        await equipmentRepository.save(equipment);

        const benefitEquipmentController = new BenefitEquipmentController();
        const preRequesitEquipmentController = new PreRequesitEquipmentController();
        features.benefits.forEach((item: CharacteristicInterface) => {
            item.id = equipment.id;
            benefitEquipmentController.create(item);
        })
        features.pre_requesits.forEach((item: CharacteristicInterface) => {
            item.id = equipment.id;
            preRequesitEquipmentController.create(item);
        })

        return response.json({
            message: "Equipamento foi criado com sucesso!"
        })
    }

    async list(request: Request, response: Response) {
        const equipmentRepository = getCustomRepository(EquipmentRepository);

        const equipments = await equipmentRepository.find();

        return response.json({
            equipments
        });
    }

    async listWithDependencies(request: Request, response: Response) {
        const equipmentRepository = getCustomRepository(EquipmentRepository);

        const { equipment } = request.body;

        const magics = await equipmentRepository.find({
            'name': equipment
        });

        const benefitEquipmentRepository = getCustomRepository(BenefitEquipmentRepository);
        const preRequesitEquipmentRepository = getCustomRepository(PreRequisiteEquipmentRepository);
        const returnJson = magics.map((async (item) => {
            let cloneItem = Object.assign(item);
            cloneItem.benefits = await benefitEquipmentRepository.find({
                'equipment': item.id
            });
            cloneItem.pre_requesits = await preRequesitEquipmentRepository.find({
                'equipment': item.id
            });
            return cloneItem;
        }));
        Promise.all(returnJson).then((values) => {
            return response.json({
                values
            })
        });
    }
}

export { EquipmentController };