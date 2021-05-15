import { EntityRepository, Repository } from 'typeorm';
import { PreRequesitHabilityClass } from '../models/PreRequesitHabilityClass';

@EntityRepository(PreRequesitHabilityClass)
class PreRequesiteClassHabilityRepository extends Repository<PreRequesitHabilityClass> {

}

export { PreRequesiteClassHabilityRepository };