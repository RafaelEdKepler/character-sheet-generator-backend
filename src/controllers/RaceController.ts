import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Race } from '../models/Race';


class RaceController {

    async create(request: Request, response: Response) {
        const raceRepository = getRepository(Race);

        const { name, description } = request.body;
        const race = raceRepository.create({
            name, description
        })

        await raceRepository.save(race);

        return response.json({
            message: "Raça foi criada com sucesso!"
        })
    }

    async list(request: Request, response: Response) {
        const raceRepository = getRepository(Race);

        const races = await raceRepository.find();

        return response.json({
            races
        });
    }
}

export { RaceController };