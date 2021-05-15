import { EntityRepository, Repository } from 'typeorm';
import { Magic } from '../models/Magic';

@EntityRepository(Magic)
class MagicRepository extends Repository<Magic> {

}

export { MagicRepository };