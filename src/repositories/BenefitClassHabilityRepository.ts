import { EntityRepository, Repository } from 'typeorm';
import { BenefitClassHability } from '../models/BenefitClassHability';

@EntityRepository(BenefitClassHability)
class BenefitClassHabilityRepository extends Repository<BenefitClassHability> {

}

export { BenefitClassHabilityRepository };