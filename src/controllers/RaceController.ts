import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { RaceRepository } from '../repositories/RaceRepository';


class RaceController {

    async create(request: Request, response: Response) {
        const raceRepository = getCustomRepository(RaceRepository);

        const { name, description, personality, appearence, relationship, tendency, origin, religion, names, adventures } = request.body;
        const race = raceRepository.create({
            name, description, personality, appearence, relationship, tendency, origin, religion, names, adventures
        })

        await raceRepository.save(race);

        return response.json({
            message: "Raça foi criada com sucesso!"
        })
    }

    async list(request: Request, response: Response) {
        const raceRepository = getCustomRepository(RaceRepository);
        const races = await raceRepository.find();

        return response.status(200).json({
            'response': races,
            'quantity': 1
        });
    }
}

export { RaceController };