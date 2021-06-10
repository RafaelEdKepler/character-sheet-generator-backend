import { EntityRepository, Repository } from 'typeorm';
import { Skill } from '../models/Skill';

@EntityRepository(Skill)
class SkillRepository extends Repository<Skill> {

}

export { SkillRepository };