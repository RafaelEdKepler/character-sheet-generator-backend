import { EntityRepository, Repository } from 'typeorm';
import { PreRequesitMagic } from '../models/PrerequesitMagic';

@EntityRepository(PreRequesitMagic)
class PreRequisiteMagicRepository extends Repository<PreRequesitMagic> {

}

export { PreRequisiteMagicRepository };