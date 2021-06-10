import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { RaceRepository } from '../repositories/RaceRepository';
import { BenefitRaceInitialStatsRepository } from '../repositories/BenefitRaceInitialStatsRepository';
import { CharacteristicInterface } from '../utils/interfaces';

class BenefitRaceInitialStatsController {

    async createWithName(request: Request, response: Response) {
        const benefitRaceInitialStatsRepository = getCustomRepository(BenefitRaceInitialStatsRepository);
        const raceRepository = getCustomRepository(RaceRepository);

        const { raceName, type, target, value } = request.body;

        const race = await raceRepository.findOne({
            'name': raceName
        });

        if (!race) {
            return response.status(404).json({
                message: "Raca não existente"
            })
        }

        const benefitRaceHability = benefitRaceInitialStatsRepository.create({
            race: race.id,
            type, target, value
        })

        await benefitRaceInitialStatsRepository.save(benefitRaceHability);

        return response.json({
            message: "Benefício de Magia foi criado com sucesso!"
        })
    }

    async create(benefits: CharacteristicInterface) {
        const benefitRaceInitialStatsRepository = getCustomRepository(BenefitRaceInitialStatsRepository);

        const { id, type, target, value } = benefits;

        const benefitRaceHability = benefitRaceInitialStatsRepository.create({
            race: id,
            type, target, value
        })

        await benefitRaceInitialStatsRepository.save(benefitRaceHability);

        return;
    }

    async list(request: Request, response: Response) {
        const { raceName } = request.body;

        const raceRepository = getCustomRepository(RaceRepository);
        const benefitRaceInitialStatsRepository = getCustomRepository(BenefitRaceInitialStatsRepository);


        const RaceHability = await raceRepository.findOne({
            'name': raceName
        });

        if (!RaceHability) {
            return response.status(404).json({
                message: "Habilidade de Classe não existente"
            });
        }

        const benefitsRaceHability = await benefitRaceInitialStatsRepository.find({
            race: RaceHability.id
        });

        return response.json({
            benefitsRaceHability
        });
    }
}

export { BenefitRaceInitialStatsController };