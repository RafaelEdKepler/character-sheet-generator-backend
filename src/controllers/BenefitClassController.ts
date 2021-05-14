import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { ClassRepository } from '../reporitories/ClassRepository';
import { BenefitClassRepository } from '../reporitories/BenefitClassRepository';

class BenefitClassController {

    async create(request: Request, response: Response) {
        const benefitClassRepository = getCustomRepository(BenefitClassRepository);
        const classeRepository = getCustomRepository(ClassRepository);
        
        const { className, type, target, value } = request.body;
        
        const classe = await classeRepository.findOne({
            'name': className
        });
        
        if (!classe) {
            return response.status(404).json({
                message: "Classe não existente"
            })
        }
        
        const benefitClass = benefitClassRepository.create({
            class: classe.id,
            type, target, value
        })
        
        await benefitClassRepository.save(benefitClass);

        return response.json({
            message: "Benfício de classe foi criado com sucesso!"
        })
    }

    async list(request: Request, response: Response) {
        const { classe } = request.body;

        const classeRepository = getCustomRepository(ClassRepository);
        const benefitClassRepository = getCustomRepository(BenefitClassRepository);


        const classeSelected = await classeRepository.findOne({
            'name': classe
        });

        if (!classeSelected) {
            return response.status(404).json({
                message: "Classe não existente"
            });
        }

        const benefitClasses = await benefitClassRepository.find({
            class: classeSelected.id
        });

        return response.json({
            benefitClasses
        });
    }
}

export { BenefitClassController };