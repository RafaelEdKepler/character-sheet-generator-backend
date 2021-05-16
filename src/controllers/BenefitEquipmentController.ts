import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { EquipmentRepository } from '../repositories/EquipmentRepository';
import { BenefitEquipmentRepository } from '../repositories/BenefitEquipmentRepository';
import { CharacteristicInterface } from '../utils/interfaces';

class BenefitEquipmentController {

    async createWithName(request: Request, response: Response) {
        const benefitEquipmentRepository = getCustomRepository(BenefitEquipmentRepository);
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

        const benefitClass = benefitEquipmentRepository.create({
            equipment: equipment.id,
            type, target, value
        })

        await benefitEquipmentRepository.save(benefitClass);

        return response.json({
            message: "Benfício de classe foi criado com sucesso!"
        })
    }

    async create(benefits: CharacteristicInterface) {
        const benefitEquipmentRepository = getCustomRepository(BenefitEquipmentRepository);

        const { id, type, target, value } = benefits;

        const benefitClass = benefitEquipmentRepository.create({
            equipment: id,
            type, target, value
        })

        await benefitEquipmentRepository.save(benefitClass);

        return;
    }

    async list(request: Request, response: Response) {
        const { equipmentName } = request.body;

        const equipmentRepository = getCustomRepository(EquipmentRepository);
        const benefitEquipmentRepository = getCustomRepository(BenefitEquipmentRepository);


        const equipment = await equipmentRepository.findOne({
            'name': equipmentName
        });

        if (!equipment) {
            return response.status(404).json({
                message: "Habilidade de Classe não existente"
            });
        }

        const benefitsEquipment = await benefitEquipmentRepository.find({
            equipment: equipment.id
        });

        return response.json({
            benefitsEquipment
        });
    }
}

export { BenefitEquipmentController };