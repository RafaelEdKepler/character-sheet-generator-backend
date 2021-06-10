import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SkillRepository } from '../repositories/SkillRepository';


class SkillController {

    async create(request: Request, response: Response) {
        const skillRepository = getCustomRepository(SkillRepository);

        const { name, description, modifier } = request.body;
        const skill = skillRepository.create({
            name, description, modifier
        })

        await skillRepository.save(skill);

        return response.json({
            message: "Perícia foi criada com sucesso!"
        })
    }

    async list(request: Request, response: Response) {
        const skillRepository = getCustomRepository(SkillRepository);

        const skills = await skillRepository.find();

        return response.json({
            skills
        });
    }

}

export { SkillController };