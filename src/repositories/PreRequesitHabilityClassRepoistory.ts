import { EntityRepository, Repository } from 'typeorm';
import { PreRequesitHabilityClass } from '../models/PrerequesitHabilityClass';

@EntityRepository(PreRequesitHabilityClass)
class PreRequesiteClassHabilityRepository extends Repository<PreRequesitHabilityClass> {

}

export { PreRequesiteClassHabilityRepository };