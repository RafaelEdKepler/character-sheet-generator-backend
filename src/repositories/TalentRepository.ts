import { EntityRepository, Repository } from 'typeorm';
import { Talent } from '../models/Talent';

@EntityRepository(Talent)
class TalentRepository extends Repository<Talent> {

}

export { TalentRepository };