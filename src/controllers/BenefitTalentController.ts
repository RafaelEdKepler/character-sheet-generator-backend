import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { TalentRepository } from '../repositories/TalentRepository';
import { BenefitTalentRepository } from '../repositories/BenefitTalentRepository';
import { CharacteristicInterface } from '../utils/interfaces';

class BenefitTalentController {

    async createWithName(request: Request, response: Response) {
        const benefitTalentRepository = getCustomRepository(BenefitTalentRepository);
        const talentRepository = getCustomRepository(TalentRepository);

        const { TalentName, type, target, value } = request.body;

        const talent = await talentRepository.findOne({
            'name': TalentName
        });

        if (!talent) {
            return response.status(404).json({
                message: "Magia não existente"
            })
        }

        const benefitTalent = benefitTalentRepository.create({
            talent: talent.id,
            type, target, value
        })

        await benefitTalentRepository.save(benefitTalent);

        return response.json({
            message: "Benefício de Talento foi criado com sucesso!"
        })
    }

    async create(benefits: CharacteristicInterface) {
        const benefitTalentRepository = getCustomRepository(BenefitTalentRepository);

        const { id, type, target, value } = benefits;

        const benefitTalent = benefitTalentRepository.create({
            talent: id,
            type, target, value
        })

        await benefitTalentRepository.save(benefitTalent);

        return;
    }

    async list(request: Request, response: Response) {
        const { TalentName } = request.body;

        const talentRepository = getCustomRepository(TalentRepository);
        const benefitTalentRepository = getCustomRepository(BenefitTalentRepository);


        const talent = await talentRepository.findOne({
            'name': TalentName
        });

        if (!talent) {
            return response.status(404).json({
                message: "Talento não existente"
            });
        }

        const benefitsTalent = await benefitTalentRepository.find({
            talent: talent.id
        });

        return response.json({
            benefitsTalent
        });
    }
}

export { BenefitTalentController };