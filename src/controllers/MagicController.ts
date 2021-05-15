import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { MagicRepository } from '../repositories/MagicRepository';
import { CharacteristicMagicArrayInterface } from '../utils/interfaces';
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
        features.forEach((item: CharacteristicMagicArrayInterface) => {
            item.benefit.magic = magic.id;
            item.pre_requesit.magic = magic.id;
            benefitMagicController.create(item.benefit);
            preRequesitMagicController.create(item.pre_requesit);
        })

        return response.json({
            message: "Equipamento foi criado com sucesso!"
        })
    }

    async list(request: Request, response: Response) {
        const magicRepository = getCustomRepository(MagicRepository);

        const magics = await magicRepository.find();

        return response.json({
            magics
        });
    }
}

export { MagicController };