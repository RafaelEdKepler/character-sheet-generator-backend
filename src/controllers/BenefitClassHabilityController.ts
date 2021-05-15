import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { ClassHabilityRepository } from '../repositories/ClassHabilityRepository';
import { BenefitClassHabilityRepository } from '../repositories/BenefitClassHabilityRepository';

import { CharacteristicClassHabilityInterface } from '../utils/interfaces';

class BenefitClassHabilityController {

    async createWithName(request: Request, response: Response) {
        const benefitClassHabilityRepository = getCustomRepository(BenefitClassHabilityRepository);
        const classHabilityRepository = getCustomRepository(ClassHabilityRepository);
        
        const { classHabilityName, type, target, value } = request.body;
        
        const classHability = await classHabilityRepository.findOne({
            'name': classHabilityName
        });
        
        if (!classHability) {
            return response.status(404).json({
                message: "Habilidade de Classe não existente"
            })
        }
        
        const benefitClass = benefitClassHabilityRepository.create({
            classHability: classHability.id,
            type, target, value
        })
        
        await benefitClassHabilityRepository.save(benefitClass);

        return response.json({
            message: "Benfício de classe foi criado com sucesso!"
        })
    }

    public async create(benefits: CharacteristicClassHabilityInterface) {
        const benefitClassHabilityRepository = getCustomRepository(BenefitClassHabilityRepository);        
        
        const { classHability, type, target, value } = benefits;
        
        const benefitClass = benefitClassHabilityRepository.create({
            classHability: classHability,
            type, target, value
        })
        
        await benefitClassHabilityRepository.save(benefitClass);

        return;
    }

    async list(request: Request, response: Response) {
        const { classHabilityName } = request.body;

        const classHabilityRepository = getCustomRepository(ClassHabilityRepository);
        const benefitClassHabilityRepository = getCustomRepository(BenefitClassHabilityRepository);


        const classHability = await classHabilityRepository.findOne({
            'name': classHabilityName
        });

        if (!classHability) {
            return response.status(404).json({
                message: "Habilidade de Classe não existente"
            });
        }

        const benefitsClassHability = await benefitClassHabilityRepository.find({
            classHability: classHability.id
        });

        return response.json({
            benefitsClassHability
        });
    }
}

export { BenefitClassHabilityController };