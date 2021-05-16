import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { RaceRepository } from '../repositories/RaceRepository';
import { RaceHabilityRepository } from '../repositories/RaceHabilityRepository';
import { BenefitRaceHabilityController } from './BenefitRaceHabilityController';
import { PreRequesitRaceHabilityController } from './PreRequesitHabilityRaceController';

import { CharacteristicInterface } from '../utils/interfaces';

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
}

export { RaceHabilityController };