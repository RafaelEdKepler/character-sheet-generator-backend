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

    async listAll(request: Request, response: Response) {
        const talentRepository = getCustomRepository(TalentRepository);

        const talents = await talentRepository.find();

        return response.json({
            talents
        });
    }

    async list(request: Request, response: Response) {
        const talentRepository = getCustomRepository(TalentRepository);
        const { talent } = request.body;

        const talents = await talentRepository.find({
            name: talent
        });

        return response.json({
            talents
        });
    }

    async listWithDependencies(request: Request, response: Response) {
        const talentRepository = getCustomRepository(TalentRepository);

        const { sheet } = request.body;

        const talents = await talentRepository.find();

        const benefitTalentRepository = getCustomRepository(BenefitTalentRepository);
        const preRequesitTalentRepository = getCustomRepository(PreRequesitTalentRepository);
        const returnJson = talents.map((async (item) => {
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
            let availableInfo = values.map((item) => {
                let available = true;
                item.pre_requesits.forEach((value: CharacteristicInterface) => {
                    try {
                        for (let sheetKey in sheet) {
                            if (parseInt(sheet[sheetKey][value.target]) >= value.value) {
                                continue;
                            }
                            available = false;
                        }
                    } catch (e) {
                        console.log('Erro ao percorrer pre-requesitos! ' + e);
                    }
                })
                if (available) {
                    return item;
                }
                return;
            })

            availableInfo = availableInfo.filter(function (el) {
                return el != null;
            });

            return response.json({
                availableInfo
            })
        });
    }


    async listAllWithDependencies(request: Request, response: Response) {
        const talentRepository = getCustomRepository(TalentRepository);

        const { sheet } = request.body;

        const talents = await talentRepository.find();

        const benefitTalentRepository = getCustomRepository(BenefitTalentRepository);
        const preRequesitTalentRepository = getCustomRepository(PreRequesitTalentRepository);
        const returnJson = talents.map((async (item) => {
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
            let availableInfo = values.map((item) => {
                let available = true;
                item.pre_requesits.forEach((value: CharacteristicInterface) => {
                    try {
                        if (sheet[value.type][value.target]) {
                            if (parseInt(sheet[value.type][value.target]) >= value.value) {
                                return;
                            }
                            available = false;
                        }
                    } catch (e) {
                        console.log('Erro ao percorrer pre-requesitos! ' + e);
                    }
                })
                if (available) {
                    return item;
                }
                return;
            })

            availableInfo = availableInfo.filter(function (el) {
                return el != null;
            });

            return response.json({
                availableInfo
            })
        });
    }
}

export { TalentController };