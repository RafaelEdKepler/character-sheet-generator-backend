import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ClassRepository } from '../repositories/ClassRepository';


class ClassController {

    async create(request: Request, response: Response) {
        const classRepository = getCustomRepository(ClassRepository);

        const { name, description } = request.body;
        const classe = classRepository.create({
            name, description
        })

        await classRepository.save(classe);

        return response.json({
            message: "Classe foi criada com sucesso!"
        })
    }

    async list(request: Request, response: Response) {
        const classRepository = getCustomRepository(ClassRepository);

        const classes = await classRepository.find();

        return response.json({
            classes
        });
    }
}

export { ClassController };