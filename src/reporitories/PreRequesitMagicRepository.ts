import { EntityRepository, Repository } from 'typeorm';
import { MagicPreRequisite } from '../models/PrerequesitMagic';

@EntityRepository(MagicPreRequisite)
class PreRequisiteMagicRepository extends Repository<MagicPreRequisite> {

}

export { PreRequisiteMagicRepository };