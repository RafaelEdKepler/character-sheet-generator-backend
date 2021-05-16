import { EntityRepository, Repository } from 'typeorm';
import { PreRequesitHabilityRace } from '../models/PrerequesitHabilityRace';

@EntityRepository(PreRequesitHabilityRace)
class PreRequesiteRaceHabilityRepository extends Repository<PreRequesitHabilityRace> {

}

export { PreRequesiteRaceHabilityRepository };