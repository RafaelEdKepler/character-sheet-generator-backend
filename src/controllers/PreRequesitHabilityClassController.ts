import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { ClassHabilityRepository } from '../repositories/ClassHabilityRepository';
import { PreRequesiteClassHabilityRepository } from '../repositories/PreRequesitHabilityClassRepoistory';
import { CharacteristicInterface } from '../utils/interfaces';

class PreRequesitClassHabilityController {

    async createWithName(request: Request, response: Response) {
        const preRequesiteClassHabilityRepository = getCustomRepository(PreRequesiteClassHabilityRepository);
        const classHabilityRepository = getCustomRepository(ClassHabilityRepository);

        const { ClassHabilityName, type, target, value } = request.body;

        const classHability = await classHabilityRepository.findOne({
            'name': ClassHabilityName
        });

        if (!classHability) {
            return response.status(404).json({
                message: "Habilidade de classe não existente"
            })
        }

        const benefitClassHability = preRequesiteClassHabilityRepository.create({
            class_hability: classHability.id,
            type, target, value
        })

        await preRequesiteClassHabilityRepository.save(benefitClassHability);

        return response.json({
            message: "Pré-requisito da Habilidade de Classe foi criado com sucesso!"
        })
    }

    async create(preRequesits: CharacteristicInterface) {
        const preRequesiteClassHabilityRepository = getCustomRepository(PreRequesiteClassHabilityRepository);

        const { id, type, target, value } = preRequesits;

        const benefitClassHability = preRequesiteClassHabilityRepository.create({
            class_hability: id,
            type, target, value
        })

        await preRequesiteClassHabilityRepository.save(benefitClassHability);

        return;
    }

    async list(request: Request, response: Response) {
        const { classHabilityName } = request.body;

        const classHabilityRepository = getCustomRepository(ClassHabilityRepository);
        const preRequesiteClassHabilityRepository = getCustomRepository(PreRequesiteClassHabilityRepository);


        const classHability = await classHabilityRepository.findOne({
            'name': classHabilityName
        });

        if (!classHability) {
            return response.status(404).json({
                message: "Habilidade de Classe não existente"
            });
        }

        const benefitsClassHability = await preRequesiteClassHabilityRepository.find({
            class_hability: classHability.id
        });

        return response.json({
            benefitsClassHability
        });
    }
}

export { PreRequesitClassHabilityController };