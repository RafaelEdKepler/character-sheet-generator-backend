import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { RaceRepository } from '../repositories/RaceRepository';
import { RaceHabilityRepository } from '../repositories/RaceHabilityRepository';

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
                message: "Raça não existente"
            })
        }
        
        const raceHability = raceHabilityRepository.create({
            race: race.id,
            name, description
        })
        
        await raceHabilityRepository.save(raceHability);

        return response.json({
            message: "Benefício de Magia foi criado com sucesso!"
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