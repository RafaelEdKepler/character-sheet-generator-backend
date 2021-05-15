import { EntityRepository, Repository } from 'typeorm';
import { BenefitTalent } from '../models/BenefitTalent';

@EntityRepository(BenefitTalent)
class BenefitTalentRepository extends Repository<BenefitTalent> {

}

export { BenefitTalentRepository };