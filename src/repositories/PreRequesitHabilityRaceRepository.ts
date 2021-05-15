import { EntityRepository, Repository } from 'typeorm';
import { PreRequesitHabilityRace } from '../models/PreRequesitHabilityRace';

@EntityRepository(PreRequesitHabilityRace)
class PreRequesiteRaceHabilityRepository extends Repository<PreRequesitHabilityRace> {

}

export { PreRequesiteRaceHabilityRepository };