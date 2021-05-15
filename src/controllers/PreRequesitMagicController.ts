import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { MagicRepository } from '../repositories/MagicRepository';
import { PreRequisiteMagicRepository } from '../repositories/PreRequesitMagicRepository';
import { CharacteristicMagicInterface } from '../utils/interfaces';

class PreRequesitMagicController {

    async createWithName(request: Request, response: Response) {
        const preRequisiteMagicRepository = getCustomRepository(PreRequisiteMagicRepository);
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
        
        const benefitMagic = preRequisiteMagicRepository.create({
            magic: magic.id,
            type, target, value
        })
        
        await preRequisiteMagicRepository.save(benefitMagic);

        return response.json({
            message: "Pré-requisito da Magia foi criado com sucesso!"
        })
    }

    async create(preRequesits: CharacteristicMagicInterface) {
        const preRequisiteMagicRepository = getCustomRepository(PreRequisiteMagicRepository);        
        
        const { magic, type, target, value } = preRequesits;        
        
        const benefitMagic = preRequisiteMagicRepository.create({
            magic: magic,
            type, target, value
        })
        
        await preRequisiteMagicRepository.save(benefitMagic);

        return;
    }

    async list(request: Request, response: Response) {
        const { magicName } = request.body;

        const magicRepository = getCustomRepository(MagicRepository);
        const preRequisiteMagicRepository = getCustomRepository(PreRequisiteMagicRepository);


        const magic = await magicRepository.findOne({
            'name': magicName
        });

        if (!magic) {
            return response.status(404).json({
                message: "Magia não existente"
            });
        }

        const benefitsMagic = await preRequisiteMagicRepository.find({
            magic: magic.id
        });

        return response.json({
            benefitsMagic
        });
    }
}

export { PreRequesitMagicController };