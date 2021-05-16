import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { MagicRepository } from '../repositories/MagicRepository';
import { BenefitMagicRepository } from '../repositories/BenefitMagicRepository';
import { CharacteristicInterface } from '../utils/interfaces';

class BenefitMagicController {

    async createWithName(request: Request, response: Response) {
        const benefitMagicRepository = getCustomRepository(BenefitMagicRepository);
        const magicRepository = getCustomRepository(MagicRepository);

        const { magicName, type, target, value } = request.body;

        const magic = await magicRepository.findOne({
            'name': magicName
        });

        if (!magic) {
            return response.status(404).json({
                message: "Magia não existente"
            })
        }

        const benefitMagic = benefitMagicRepository.create({
            magic: magic.id,
            type, target, value
        })

        await benefitMagicRepository.save(benefitMagic);

        return response.json({
            message: "Benefício de Magia foi criado com sucesso!"
        })
    }

    async create(benefits: CharacteristicInterface) {
        const benefitMagicRepository = getCustomRepository(BenefitMagicRepository);

        const { id, type, target, value } = benefits;

        const benefitMagic = benefitMagicRepository.create({
            magic: id,
            type, target, value
        })

        await benefitMagicRepository.save(benefitMagic);

        return;
    }

    async list(request: Request, response: Response) {
        const { magicName } = request.body;

        const magicRepository = getCustomRepository(MagicRepository);
        const benefitMagicRepository = getCustomRepository(BenefitMagicRepository);


        const magic = await magicRepository.findOne({
            'name': magicName
        });

        if (!magic) {
            return response.status(404).json({
                message: "Habilidade de Classe não existente"
            });
        }

        const benefitsMagic = await benefitMagicRepository.find({
            magic: magic.id
        });

        return response.json({
            benefitsMagic
        });
    }
}

export { BenefitMagicController };