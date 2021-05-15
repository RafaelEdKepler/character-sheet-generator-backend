import { EntityRepository, Repository } from 'typeorm';
import { BenefitRaceHability } from '../models/BenefitRaceHability';

@EntityRepository(BenefitRaceHability)
class BenefitRaceHabilityRepository extends Repository<BenefitRaceHability> {

}

export { BenefitRaceHabilityRepository };