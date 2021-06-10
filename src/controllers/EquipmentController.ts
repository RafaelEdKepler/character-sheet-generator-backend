import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { BenefitEquipmentRepository } from '../repositories/BenefitEquipmentRepository';
import { EquipmentRepository } from '../repositories/EquipmentRepository';
import { PreRequisiteEquipmentRepository } from '../repositories/PreRequesitEquipmentRepository';
import { CharacteristicInterface } from '../utils/interfaces';
import { BenefitEquipmentController } from './BenefitEquipmentController';
import { PreRequesitEquipmentController } from './PreRequesitEquipmentController';


class EquipmentController {

    async create(request: Request, response: Response) {
        const equipmentRepository = getCustomRepository(EquipmentRepository);

        const { name, description, cost, damage, critic, distance, weight, type_damage, ca_bonus, dex_bonus, armor_penalty } = request.body;
        const equipment = equipmentRepository.create({
            name, description, cost, damage, critic, distance, weight, type_damage, ca_bonus, dex_bonus, armor_penalty
        })

        await equipmentRepository.save(equipment);

        return response.json({
            message: "Equipamento foi criado com sucesso!"
        })
    }

    async createWithDependencies(request: Request, response: Response) {
        const equipmentRepository = getCustomRepository(EquipmentRepository);

        const { name, description, cost, damage, critic, distance, weight, type_damage, ca_bonus, dex_bonus, armor_penalty, features } = request.body;
        const equipment = equipmentRepository.create({
            name, description, cost, damage, critic, distance, weight, type_damage, ca_bonus, dex_bonus, armor_penalty
        })

        await equipmentRepository.save(equipment);

        const benefitEquipmentController = new BenefitEquipmentController();
        const preRequesitEquipmentController = new PreRequesitEquipmentController();
        features.benefits.forEach((item: CharacteristicInterface) => {
            item.id = equipment.id;
            benefitEquipmentController.create(item);
        })
        features.pre_requesits.forEach((item: CharacteristicInterface) => {
            item.id = equipment.id;
            preRequesitEquipmentController.create(item);
        })

        return response.json({
            message: "Equipamento foi criado com sucesso!"
        })
    }

    async list(request: Request, response: Response) {
        const equipmentRepository = getCustomRepository(EquipmentRepository);

        const equipments = await equipmentRepository.find();

        return response.json({
            equipments
        });
    }

    async listWithDependencies(request: Request, response: Response) {
        const equipmentRepository = getCustomRepository(EquipmentRepository);

        const { equipment, sheet } = request.body;

        const equipments = await equipmentRepository.find({
            'name': equipment
        });

        const benefitEquipmentRepository = getCustomRepository(BenefitEquipmentRepository);
        const preRequesitEquipmentRepository = getCustomRepository(PreRequisiteEquipmentRepository);
        const returnJson = equipments.map((async (item) => {
            let cloneItem = Object.assign(item);
            cloneItem.benefits = await benefitEquipmentRepository.find({
                'equipment': item.id
            });
            cloneItem.pre_requesits = await preRequesitEquipmentRepository.find({
                'equipment': item.id
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
        const equipmentRepository = getCustomRepository(EquipmentRepository);

        const { sheet } = request.body;

        const equipments = await equipmentRepository.find();

        const benefitEquipmentRepository = getCustomRepository(BenefitEquipmentRepository);
        const preRequesitEquipmentRepository = getCustomRepository(PreRequisiteEquipmentRepository);
        const returnJson = equipments.map((async (item) => {
            let cloneItem = Object.assign(item);
            cloneItem.benefits = await benefitEquipmentRepository.find({
                'equipment': item.id
            });
            cloneItem.pre_requesits = await preRequesitEquipmentRepository.find({
                'equipment': item.id
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

export { EquipmentController };