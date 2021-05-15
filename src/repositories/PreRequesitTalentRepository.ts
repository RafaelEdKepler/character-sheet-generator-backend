import { EntityRepository, Repository } from 'typeorm';
import { TalentPreRequisite } from '../models/PreRequesitTalent';

@EntityRepository(TalentPreRequisite)
class PreRequisiteMagicRepository extends Repository<TalentPreRequisite> {

}

export { PreRequisiteMagicRepository };