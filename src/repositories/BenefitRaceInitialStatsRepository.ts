import { EntityRepository, Repository } from 'typeorm';
import { BenefitRaceInitialStats } from '../models/BenefitRaceInitialStats';

@EntityRepository(BenefitRaceInitialStats)
class BenefitRaceInitialStatsRepository extends Repository<BenefitRaceInitialStats> {

}

export { BenefitRaceInitialStatsRepository };