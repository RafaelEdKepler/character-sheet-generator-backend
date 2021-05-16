import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { EquipmentRepository } from '../repositories/EquipmentRepository';
import { PreRequisiteEquipmentRepository } from '../repositories/PreRequesitEquipmentRepository';
import { CharacteristicInterface } from '../utils/interfaces';

class PreRequesitEquipmentController {

    async createWithName(request: Request, response: Response) {
        const preRequisiteEquipmentRepository = getCustomRepository(PreRequisiteEquipmentRepository);
        const equipmentRepository = getCustomRepository(EquipmentRepository);

        const { equipmentName, type, target, value } = request.body;

        const equipment = await equipmentRepository.findOne({
            'name': equipmentName
        });

        if (!equipment) {
            return response.status(404).json({
                message: "Equipamento não existente"
            })
        }

        const benefitEquipment = preRequisiteEquipmentRepository.create({
            equipment: equipment.id,
            type, target, value
        })

        await preRequisiteEquipmentRepository.save(benefitEquipment);

        return response.json({
            message: "Pré-requisito do equipamento foi criado com sucesso!"
        })
    }

    async create(preRequesits: CharacteristicInterface) {
        const preRequisiteEquipmentRepository = getCustomRepository(PreRequisiteEquipmentRepository);

        const { id, type, target, value } = preRequesits;

        const benefitEquipment = preRequisiteEquipmentRepository.create({
            equipment: id,
            type, target, value
        })

        await preRequisiteEquipmentRepository.save(benefitEquipment);

        return;
    }

    async list(request: Request, response: Response) {
        const { EquipmentName } = request.body;

        const equipmentRepository = getCustomRepository(EquipmentRepository);
        const preRequisiteEquipmentRepository = getCustomRepository(PreRequisiteEquipmentRepository);


        const equipment = await equipmentRepository.findOne({
            'name': EquipmentName
        });

        if (!equipment) {
            return response.status(404).json({
                message: "Habilidade de Classe não existente"
            });
        }

        const benefitsEquipment = await preRequisiteEquipmentRepository.find({
            equipment: equipment.id
        });

        return response.json({
            benefitsEquipment
        });
    }
}

export { PreRequesitEquipmentController };