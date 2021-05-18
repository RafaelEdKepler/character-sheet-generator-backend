import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { RaceRepository } from '../repositories/RaceRepository';
import { RaceHabilityRepository } from '../repositories/RaceHabilityRepository';
import { BenefitRaceHabilityController } from './BenefitRaceHabilityController';
import { PreRequesitRaceHabilityController } from './PreRequesitHabilityRaceController';

import { CharacteristicInterface } from '../utils/interfaces';
import { BenefitRaceHabilityRepository } from '../repositories/BenefitRaceHabilityRepository';
import { PreRequesiteRaceHabilityRepository } from '../repositories/PreRequesitHabilityRaceRepository';

class RaceHabilityController {

    async create(request: Request, response: Response) {
        const raceHabilityRepository = getCustomRepository(RaceHabilityRepository);
        const raceRepository = getCustomRepository(RaceRepository);

        const { RaceName, name, description } = request.body;

        const race = await raceRepository.findOne({
            'name': RaceName
        });

        if (!race) {
            return response.status(404).json({
                message: "Raça não existente: Race"
            })
        }

        const raceHability = raceHabilityRepository.create({
            race: race.id,
            name, description
        })

        await raceHabilityRepository.save(raceHability);

        return response.json({
            message: "Benefício de Habilidade de Raca foi criado com sucesso!"
        })
    }

    async createWithDependencies(request: Request, response: Response) {
        const raceHabilityRepository = getCustomRepository(RaceHabilityRepository);
        const raceRepository = getCustomRepository(RaceRepository);

        const { raceName, name, description, features } = request.body;

        const race = await raceRepository.findOne({
            'name': raceName
        });

        if (!race) {
            return response.status(404).json({
                message: "Raça não existente: Race " + race
            })
        }

        const raceHability = raceHabilityRepository.create({
            race: race.id,
            name, description
        })

        await raceHabilityRepository.save(raceHability);

        const benefitRaceHabilityController = new BenefitRaceHabilityController();
        const preRequesitRaceHabilityController = new PreRequesitRaceHabilityController();
        features.benefits.forEach((item: CharacteristicInterface) => {
            item.id = raceHability.id;
            benefitRaceHabilityController.create(item);
        })

        features.pre_requesits.forEach((item: CharacteristicInterface) => {
            item.id = raceHability.id;
            preRequesitRaceHabilityController.create(item);
        })

        return response.json({
            message: "Habilidade de Raca criada com sucesso."
        })
    }

    async list(request: Request, response: Response) {
        const { raceName } = request.body;

        const raceRepository = getCustomRepository(RaceRepository);
        const raceHabilityRepository = getCustomRepository(RaceHabilityRepository);


        const race = await raceRepository.findOne({
            'name': raceName
        });

        if (!race) {
            return response.status(404).json({
                message: "Raça não existente"
            });
        }

        const habilityRace = await raceHabilityRepository.find({
            race: race.id
        });

        return response.json({
            habilityRace
        });
    }

    async listWithDependencies(request: Request, response: Response) {
        const raceHabilityRepository = getCustomRepository(RaceHabilityRepository);

        const { raceHability } = request.body;

        const magics = await raceHabilityRepository.find({
            'name': raceHability
        });

        const benefitRaceHabilityRepository = getCustomRepository(BenefitRaceHabilityRepository);
        const preRequesitRaceHabilityRepository = getCustomRepository(PreRequesiteRaceHabilityRepository);
        const returnJson = magics.map((async (item) => {
            let cloneItem = Object.assign(item);
            cloneItem.benefits = await benefitRaceHabilityRepository.find({
                'race_hability': item.id
            });
            cloneItem.pre_requesits = await preRequesitRaceHabilityRepository.find({
                'race_hability': item.id
            });
            return cloneItem;
        }));
        Promise.all(returnJson).then((values) => {
            return response.json({
                values
            })
        });
    }
}

export { RaceHabilityController };