import { EntityRepository, Repository } from 'typeorm';
import { RaceHability } from '../models/RaceHability';

@EntityRepository(RaceHability)
class RaceHabilityRepository extends Repository<RaceHability> {

}

export { RaceHabilityRepository };