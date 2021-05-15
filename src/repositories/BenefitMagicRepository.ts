import { EntityRepository, Repository } from 'typeorm';
import { BenefitMagic } from '../models/BenefitMagic';

@EntityRepository(BenefitMagic)
class BenefitMagicRepository extends Repository<BenefitMagic> {

}

export { BenefitMagicRepository };