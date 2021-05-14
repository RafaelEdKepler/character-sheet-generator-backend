import { EntityRepository, Repository } from 'typeorm';
import { ClassHabilityPreRequisite } from '../models/PrerequesitHabilityClass';

@EntityRepository(ClassHabilityPreRequisite)
class PreRequesiteClassHabilityRepository extends Repository<ClassHabilityPreRequisite> {

}

export { PreRequesiteClassHabilityRepository };