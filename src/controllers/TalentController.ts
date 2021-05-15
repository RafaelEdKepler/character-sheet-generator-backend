import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { TalentRepository } from '../repositories/TalentRepository';
import { BenefitTalentController } from './BenefitTalentController';
import { PreRequesitTalentController } from './PreRequesitTalentController';

import { CharacteristicTalentArrayInterface } from '../utils/interfaces';


class TalentController {

    async create(request: Request, response: Response) {
        const talentRepository = getCustomRepository(TalentRepository);

        const { name, description } = request.body;
        const talent = talentRepository.create({
            name, description
        })

        await talentRepository.save(talent);

        return response.json({
            message: "Talento foi criado com sucesso!"
        })
    }

    async createWithDependencies(request: Request, response: Response) {
        const talentRepository = getCustomRepository(TalentRepository);

        const { name, description, features } = request.body;
        const talent = talentRepository.create({
            name, description
        })

        await talentRepository.save(talent);

        const benefitTalentController = new BenefitTalentController(); 
        const preRequesitTalentController = new PreRequesitTalentController();
        features.forEach((item: CharacteristicTalentArrayInterface) => {
            item.benefit.talent = talent.id;
            item.pre_requesit.talent = talent.id;
            benefitTalentController.create(item.benefit);
            preRequesitTalentController.create(item.pre_requesit);
        })

        return response.json({
            message: "Equipamento foi criado com sucesso!"
        })
    }

    async list(request: Request, response: Response) {
        const talentRepository = getCustomRepository(TalentRepository);

        const talents = await talentRepository.find();

        return response.json({
            talents
        });
    }
}

export { TalentController };