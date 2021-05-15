import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { RaceRepository } from '../repositories/RaceRepository';
import { BenefitRaceRepository } from '../repositories/BenefitRaceRepository';

class BenefitRaceController {

    async createWithName(request: Request, response: Response) {
        const benefitRaceRepository = getCustomRepository(BenefitRaceRepository);
        const raceRepository = getCustomRepository(RaceRepository);
        
        const { raceName, type, target, value } = request.body;
        
        const race = await raceRepository.findOne({
            'name': raceName
        });
        
        if (!race) {
            return response.status(404).json({
                message: "Raça não existente"
            })
        }
        
        const benefitRace = benefitRaceRepository.create({
            race: race.id,
            type, target, value
        })
        
        await benefitRaceRepository.save(benefitRace);

        return response.json({
            message: "Benefício de Raça foi criado com sucesso!"
        })
    }

    async create(request: Request, response: Response) {
        const benefitRaceRepository = getCustomRepository(BenefitRaceRepository);        
        
        const { race, type, target, value } = request.body;
        
        const benefitRace = benefitRaceRepository.create({
            race: race,
            type, target, value
        })
        
        await benefitRaceRepository.save(benefitRace);

        return response.json({
            message: "Benefício de Raça foi criado com sucesso!"
        })
    }

    async list(request: Request, response: Response) {
        const { raceName } = request.body;

        const raceRepository = getCustomRepository(RaceRepository);
        const benefitRaceRepository = getCustomRepository(BenefitRaceRepository);


        const Race = await raceRepository.findOne({
            'name': raceName
        });

        if (!Race) {
            return response.status(404).json({
                message: "Habilidade de Raça não existente"
            });
        }

        const benefitsRace = await benefitRaceRepository.find({
            race: Race.id
        });

        return response.json({
            benefitsRace
        });
    }
}

export { BenefitRaceController };