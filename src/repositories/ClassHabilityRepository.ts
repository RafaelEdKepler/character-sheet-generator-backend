import { EntityRepository, Repository } from 'typeorm';
import { ClassHability } from '../models/ClassHability';

@EntityRepository(ClassHability)
class ClassHabilityRepository extends Repository<ClassHability> {

}

export { ClassHabilityRepository };