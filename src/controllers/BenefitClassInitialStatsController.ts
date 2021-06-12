import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { ClassRepository } from '../repositories/ClassRepository';
import { BenefitClassInitialStatsRepository } from '../repositories/BenefitClassInitialStatsRepository';

import { CharacteristicInterface } from '../utils/interfaces';

class BenefitClassInitialStatsController {

    async createWithName(request: Request, response: Response) {
        const benefitclassRepository = getCustomRepository(BenefitClassInitialStatsRepository);
        const classRepository = getCustomRepository(ClassRepository);

        const { className, type, target, value } = request.body;

        const classe = await classRepository.findOne({
            'name': className
        });

        if (!classe) {
            return response.status(404).json({
                message: "Classe não existente"
            })
        }

        const benefitClass = benefitclassRepository.create({
            class: classe.id,
            type, target, value
        })

        await benefitclassRepository.save(benefitClass);

        return response.json({
            message: "Dados iniciais de classe foram criado com sucesso!"
        })
    }

    public async create(benefits: CharacteristicInterface) {
        const benefitclassRepository = getCustomRepository(BenefitClassInitialStatsRepository);

        const { id, type, target, value } = benefits;

        const benefitClass = benefitclassRepository.create({
            class: id,
            type, target, value
        })

        await benefitclassRepository.save(benefitClass);

        return;
    }

    async list(request: Request, response: Response) {
        const { className } = request.body;

        const classRepository = getCustomRepository(ClassRepository);
        const benefitclassRepository = getCustomRepository(BenefitClassInitialStatsRepository);


        const classHability = await classRepository.findOne({
            'name': className
        });

        if (!classHability) {
            return response.status(404).json({
                message: "Classe não existente"
            });
        }

        const benefitsClassInitialStats = await benefitclassRepository.find({
            class: classHability.id
        });

        return response.json({
            benefitsClassInitialStats
        });
    }
}

export { BenefitClassInitialStatsController };