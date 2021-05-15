import { EntityRepository, Repository } from 'typeorm';
import { BenefitClass } from '../models/BenefitClass';

@EntityRepository(BenefitClass)
class BenefitClassRepository extends Repository<BenefitClass> {

}

export { BenefitClassRepository };