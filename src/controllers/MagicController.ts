import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { BenefitMagicRepository } from '../repositories/BenefitMagicRepository';
import { MagicRepository } from '../repositories/MagicRepository';
import { PreRequisiteMagicRepository } from '../repositories/PreRequisiteMagicRepository';
import { CharacteristicInterface } from '../utils/interfaces';
import { BenefitMagicController } from './BenefitMagicController';
import { PreRequesitMagicController } from './PreRequesitMagicController';


class MagicController {

    async create(request: Request, response: Response) {
        const magicRepository = getCustomRepository(MagicRepository);

        const { name, description } = request.body;
        const magic = magicRepository.create({
            name, description
        })

        await magicRepository.save(magic);

        return response.json({
            message: "Magia foi criada com sucesso!"
        })
    }

    async createWithDependencies(request: Request, response: Response) {
        const magicRepository = getCustomRepository(MagicRepository);

        const { name, description, features } = request.body;
        const magic = magicRepository.create({
            name, description
        })

        await magicRepository.save(magic);

        const benefitMagicController = new BenefitMagicController();
        const preRequesitMagicController = new PreRequesitMagicController();
        features.benefits.forEach((item: CharacteristicInterface) => {
            item.id = magic.id;
            benefitMagicController.create(item);
        })
        features.benefits.forEach((item: CharacteristicInterface) => {
            item.id = magic.id;
            preRequesitMagicController.create(item);
        })

        return response.json({
            message: "Magia foi criada com sucesso!"
        })
    }

    async list(request: Request, response: Response) {
        const magicRepository = getCustomRepository(MagicRepository);

        const magics = await magicRepository.find();

        return response.json({
            magics
        });
    }

    async listWithDependencies(request: Request, response: Response) {
        const magicRepository = getCustomRepository(MagicRepository);

        const { magic, sheet } = request.body;

        const magics = await magicRepository.find({
            'name': magic
        });

        const benefitMagicRepository = getCustomRepository(BenefitMagicRepository);
        const preRequesitMagicRepository = getCustomRepository(PreRequisiteMagicRepository);
        const returnJson = magics.map((async (item) => {
            let cloneItem = Object.assign(item);
            cloneItem.benefits = await benefitMagicRepository.find({
                'magic': item.id
            });
            cloneItem.pre_requesits = await preRequesitMagicRepository.find({
                'magic': item.id
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
        const magicRepository = getCustomRepository(MagicRepository);

        const { sheet } = request.body;
        const magics = await magicRepository.find();

        const benefitMagicRepository = getCustomRepository(BenefitMagicRepository);
        const preRequesitMagicRepository = getCustomRepository(PreRequisiteMagicRepository);
        const returnJson = magics.map((async (item) => {
            let cloneItem = Object.assign(item);
            cloneItem.benefits = await benefitMagicRepository.find({
                'magic': item.id
            });
            cloneItem.pre_requesits = await preRequesitMagicRepository.find({
                'magic': item.id
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

export { MagicController };