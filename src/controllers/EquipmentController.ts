import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { EquipmentRepository } from '../repositories/EquipmentRepository';
import { CharacteristicEquipmentArrayInterface } from '../utils/interfaces';
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
        features.forEach((item: CharacteristicEquipmentArrayInterface) => {
            item.benefit.equipment = equipment.id;
            item.pre_requesit.equipment = equipment.id;
            benefitEquipmentController.create(item.benefit);
            preRequesitEquipmentController.create(item.pre_requesit);
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
}

export { EquipmentController };