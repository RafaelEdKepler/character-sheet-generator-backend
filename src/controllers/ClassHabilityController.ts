import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { ClassRepository } from '../repositories/ClassRepository';
import { ClassHabilityRepository } from '../repositories/ClassHabilityRepository';
import { BenefitClassHabilityController } from './BenefitClassHabilityController';

import { CharacteristicInterface } from '../utils/interfaces';
import { PreRequesitClassHabilityController } from './PreRequesitHabilityClassController';
import { BenefitClassHabilityRepository } from '../repositories/BenefitClassHabilityRepository';
import { PreRequesiteClassHabilityRepository } from '../repositories/PreRequesitHabilityClassRepoistory';

class ClassHabilityController {


    async create(request: Request, response: Response) {
        const classHabilityRepository = getCustomRepository(ClassHabilityRepository);
        const classRepository = getCustomRepository(ClassRepository);

        const { className, name, description } = request.body;

        const classe = await classRepository.findOne({
            'name': className
        });

        if (!classe) {
            return response.status(404).json({
                message: "Classe não existente"
            })
        }

        const classHability = classHabilityRepository.create({
            class: classe.id,
            name, description
        })

        await classHabilityRepository.save(classHability);

        return response.json({
            message: "Habilidade de Classe foi criada com sucesso!"
        })
    }

    async createWithDependencies(request: Request, response: Response) {
        const classHabilityRepository = getCustomRepository(ClassHabilityRepository);
        const classRepository = getCustomRepository(ClassRepository);

        const { className, name, description, features } = request.body;

        const classe = await classRepository.findOne({
            'name': className
        });

        if (!classe) {
            return response.status(404).json({
                message: "Classe não existente"
            })
        }

        const classHability = classHabilityRepository.create({
            class: classe.id,
            name, description
        })

        await classHabilityRepository.save(classHability);

        const benefitClassHabilityController = new BenefitClassHabilityController();
        const preRequesitClassHabilityController = new PreRequesitClassHabilityController();
        features.benefits.forEach((item: CharacteristicInterface) => {
            item.id = classHability.id;
            benefitClassHabilityController.create(item);
        })
        features.pre_requesits.forEach((item: CharacteristicInterface) => {
            item.id = classHability.id;
            preRequesitClassHabilityController.create(item);
        })

        return response.json({
            message: "Habilidade de classe criada com sucesso."
        });
    }

    async list(request: Request, response: Response) {
        const { className } = request.body;

        const classRepository = getCustomRepository(ClassRepository);
        const classHabilityRepository = getCustomRepository(ClassHabilityRepository);


        const classe = await classRepository.findOne({
            'name': className
        });

        if (!classe) {
            return response.status(404).json({
                message: "Classe não existente"
            });
        }

        const benefitsClass = await classHabilityRepository.find({
            class: classe.id
        });

        return response.json({
            benefitsClass
        });
    }

    async listWithDependencies(request: Request, response: Response) {
        const { className } = request.body;

        const classRepository = getCustomRepository(ClassRepository);
        const classHabilityRepository = getCustomRepository(ClassHabilityRepository);


        const classe = await classRepository.findOne({
            'name': className
        });

        if (!classe) {
            return response.status(404).json({
                message: "Classe não existente"
            });
        }

        const habilityClass = await classHabilityRepository.find({
            class: classe.id
        });

        const benefitsClassHabilityRepository = getCustomRepository(BenefitClassHabilityRepository);
        const preRequesitClassHabilityRepository = getCustomRepository(PreRequesiteClassHabilityRepository);
        let returnJson = new Array();
        habilityClass.forEach(async (item) => {
            let cloneItem = item;
            cloneItem.benefits = await benefitsClassHabilityRepository.find({
                'class_hability': item.id
            });
            cloneItem.pre_requesits = await preRequesitClassHabilityRepository.find({
                'class_hability': item.id
            });
            returnJson.push(cloneItem);
        });

        return response.json(returnJson);
    }
}

export { ClassHabilityController };