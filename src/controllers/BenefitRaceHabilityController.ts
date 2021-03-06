import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { RaceHabilityRepository } from '../repositories/RaceHabilityRepository';
import { BenefitRaceHabilityRepository } from '../repositories/BenefitRaceHabilityRepository';
import { CharacteristicInterface } from '../utils/interfaces';

class BenefitRaceHabilityController {

    async createWithName(request: Request, response: Response) {
        const benefitRaceHabilityRepository = getCustomRepository(BenefitRaceHabilityRepository);
        const raceHabilityRepository = getCustomRepository(RaceHabilityRepository);

        const { raceHabilityName, type, target, value } = request.body;

        const raceHability = await raceHabilityRepository.findOne({
            'name': raceHabilityName
        });

        if (!raceHability) {
            return response.status(404).json({
                message: "Magia não existente"
            })
        }

        const benefitRaceHability = benefitRaceHabilityRepository.create({
            race_hability: raceHability.id,
            type, target, value
        })

        await benefitRaceHabilityRepository.save(benefitRaceHability);

        return response.json({
            message: "Benefício de Magia foi criado com sucesso!"
        })
    }

    async create(benefits: CharacteristicInterface) {
        const benefitRaceHabilityRepository = getCustomRepository(BenefitRaceHabilityRepository);

        const { id, type, target, value } = benefits;

        const benefitRaceHability = benefitRaceHabilityRepository.create({
            race_hability: id,
            type, target, value
        })

        await benefitRaceHabilityRepository.save(benefitRaceHability);

        return;
    }

    async list(request: Request, response: Response) {
        const { raceHabilityName } = request.body;

        const raceHabilityRepository = getCustomRepository(RaceHabilityRepository);
        const benefitRaceHabilityRepository = getCustomRepository(BenefitRaceHabilityRepository);


        const RaceHability = await raceHabilityRepository.findOne({
            'name': raceHabilityName
        });

        if (!RaceHability) {
            return response.status(404).json({
                message: "Habilidade de Classe não existente"
            });
        }

        const benefitsRaceHability = await benefitRaceHabilityRepository.find({
            race_hability: RaceHability.id
        });

        return response.json({
            benefitsRaceHability
        });
    }
}

export { BenefitRaceHabilityController };