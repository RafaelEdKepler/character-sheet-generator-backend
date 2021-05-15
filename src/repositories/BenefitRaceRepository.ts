import { EntityRepository, Repository } from 'typeorm';
import { BenefitRace } from '../models/BenefitRace';

@EntityRepository(BenefitRace)
class BenefitRaceRepository extends Repository<BenefitRace> {

}

export { BenefitRaceRepository };