import { EntityRepository, Repository } from 'typeorm';
import { Race } from '../models/Race';

@EntityRepository(Race)
class RaceRepository extends Repository<Race> {

}

export { RaceRepository };