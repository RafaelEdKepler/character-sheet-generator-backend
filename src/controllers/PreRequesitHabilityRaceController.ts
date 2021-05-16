import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { RaceHabilityRepository } from '../repositories/RaceHabilityRepository';
import { PreRequesiteRaceHabilityRepository } from '../repositories/PreRequesitHabilityRaceRepository';
import { CharacteristicInterface } from '../utils/interfaces';

class PreRequesitRaceHabilityController {

    async createWithName(request: Request, response: Response) {
        const preRequesiteRaceHabilityRepository = getCustomRepository(PreRequesiteRaceHabilityRepository);
        const raceHabilityRepository = getCustomRepository(RaceHabilityRepository);

        const { raceHabilityName, type, target, value } = request.body;

        const raceHability = await raceHabilityRepository.findOne({
            'name': raceHabilityName
        });

        if (!raceHability) {
            return response.status(404).json({
                message: "Habilidade de Raça não existente"
            })
        }

        const benefitRaceHability = preRequesiteRaceHabilityRepository.create({
            race_hability: raceHability.id,
            type, target, value
        })

        await preRequesiteRaceHabilityRepository.save(benefitRaceHability);

        return response.json({
            message: "Pré-requisito da Habilidade de Raça foi criado com sucesso!"
        })
    }

    async create(preRequesits: CharacteristicInterface) {
        const preRequesiteRaceHabilityRepository = getCustomRepository(PreRequesiteRaceHabilityRepository);

        const { id, type, target, value } = preRequesits;

        const benefitRaceHability = await preRequesiteRaceHabilityRepository.create({
            race_hability: id,
            type, target, value
        })
        console.log("Criacao Pre: " + benefitRaceHability.target + ' - ' + target);
        await preRequesiteRaceHabilityRepository.save(benefitRaceHability);

        return;
    }

    async list(request: Request, response: Response) {
        const { raceHabilityName } = request.body;

        const raceHabilityRepository = getCustomRepository(RaceHabilityRepository);
        const preRequesiteRaceHabilityRepository = getCustomRepository(PreRequesiteRaceHabilityRepository);


        const raceHability = await raceHabilityRepository.findOne({
            'name': raceHabilityName
        });

        if (!raceHability) {
            return response.status(404).json({
                message: "Habilidade de Raça não existente"
            });
        }

        const benefitsRaceHability = await preRequesiteRaceHabilityRepository.find({
            race_hability: raceHability.id
        });

        return response.json({
            benefitsRaceHability
        });
    }
}

export { PreRequesitRaceHabilityController };