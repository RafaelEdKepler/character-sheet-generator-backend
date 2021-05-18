import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { TalentRepository } from '../repositories/TalentRepository';
import { BenefitTalentController } from './BenefitTalentController';
import { PreRequesitTalentController } from './PreRequesitTalentController';

import { CharacteristicInterface, Sheet } from '../utils/interfaces';
import { BenefitTalentRepository } from '../repositories/BenefitTalentRepository';
import { PreRequesitTalentRepository } from '../repositories/PreRequesitTalentRepository';


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
        features.benefits.forEach((item: CharacteristicInterface) => {
            item.id = talent.id;
            benefitTalentController.create(item);
        })
        features.benefits.forEach((item: CharacteristicInterface) => {
            item.id = talent.id;
            preRequesitTalentController.create(item);
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

    async listWithDependencies(request: Request, response: Response) {
        const talentRepository = getCustomRepository(TalentRepository);

        const { talent, sheet } = request.body;

        const magics = await talentRepository.find({
            'name': talent
        });

        const benefitTalentRepository = getCustomRepository(BenefitTalentRepository);
        const preRequesitTalentRepository = getCustomRepository(PreRequesitTalentRepository);
        const returnJson = magics.map((async (item) => {
            let cloneItem = Object.assign(item);
            cloneItem.benefits = await benefitTalentRepository.find({
                'talent': item.id
            });
            cloneItem.pre_requesits = await preRequesitTalentRepository.find({
                'talent': item.id
            });
            return cloneItem;
        }));
        Promise.all(returnJson).then((values) => {
            const availableInfo = values.map((item) => {
                let available = true;
                item.pre_requesits.forEach((value: CharacteristicInterface) => {
                    sheet[value.type].forEach((sheetValue: CharacteristicInterface) => {
                        if (sheetValue.value >= value.value) {
                            return;
                        }
                        available = false;
                    })
                })
                if (available) {
                    return item;
                }
                return;
            })

            return response.json({
                availableInfo
            })
        });
    }
}

export { TalentController };