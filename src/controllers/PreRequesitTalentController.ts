import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { TalentRepository } from '../repositories/TalentRepository';
import { PreRequesitTalentRepository } from '../repositories/PreRequesitTalentRepository';
import { CharacteristicInterface } from '../utils/interfaces';

class PreRequesitTalentController {

    async createWithName(request: Request, response: Response) {
        const preRequesiteTalentRepository = getCustomRepository(PreRequesitTalentRepository);
        const talentRepository = getCustomRepository(TalentRepository);

        const { talentName, type, target, value } = request.body;

        const talent = await talentRepository.findOne({
            'name': talentName
        });

        if (!talent) {
            return response.status(404).json({
                message: "Talento não existente"
            })
        }

        const benefitTalent = preRequesiteTalentRepository.create({
            talent: talent.id,
            type, target, value
        })

        await preRequesiteTalentRepository.save(benefitTalent);

        return response.json({
            message: "Pré-requisito de Talento foi criado com sucesso!"
        })
    }

    async create(preRequesits: CharacteristicInterface) {
        const preRequesiteTalentRepository = getCustomRepository(PreRequesitTalentRepository);

        const { id, type, target, value } = preRequesits;

        const benefitTalent = preRequesiteTalentRepository.create({
            talent: id,
            type, target, value
        })

        await preRequesiteTalentRepository.save(benefitTalent);

        return;
    }

    async list(request: Request, response: Response) {
        const { talentName } = request.body;

        const talentRepository = getCustomRepository(TalentRepository);
        const preRequesiteTalentRepository = getCustomRepository(PreRequesitTalentRepository);


        const talent = await talentRepository.findOne({
            'name': talentName
        });

        if (!talent) {
            return response.status(404).json({
                message: "Talento não existente"
            });
        }

        const benefitsTalent = await preRequesiteTalentRepository.find({
            talent: talent.id
        });

        return response.json({
            benefitsTalent
        });
    }
}

export { PreRequesitTalentController };