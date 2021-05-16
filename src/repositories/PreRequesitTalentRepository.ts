import { EntityRepository, Repository } from 'typeorm';
import { PreRequesitTalent } from '../models/PreRequesitTalent';

@EntityRepository(PreRequesitTalent)
class PreRequesitTalentRepository extends Repository<PreRequesitTalent> {

}

export { PreRequesitTalentRepository };