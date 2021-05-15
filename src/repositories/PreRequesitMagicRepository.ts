import { EntityRepository, Repository } from 'typeorm';
import { PreRequesitMagic } from '../models/PreRequesitMagic';

@EntityRepository(PreRequesitMagic)
class PreRequisiteMagicRepository extends Repository<PreRequesitMagic> {

}

export { PreRequisiteMagicRepository };