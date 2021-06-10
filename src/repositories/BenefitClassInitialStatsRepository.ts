import { EntityRepository, Repository } from 'typeorm';
import { BenefitClassInitialStats } from '../models/BenefitClassInitialStats';

@EntityRepository(BenefitClassInitialStats)
class BenefitClassInitialStatsRepository extends Repository<BenefitClassInitialStats> {

}

export { BenefitClassInitialStatsRepository };