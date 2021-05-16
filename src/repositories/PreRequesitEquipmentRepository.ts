import { EntityRepository, Repository } from 'typeorm';
import { PreRequesitEquipment } from '../models/PrerequesitEquipment';

@EntityRepository(PreRequesitEquipment)
class PreRequisiteEquipmentRepository extends Repository<PreRequesitEquipment> {

}

export { PreRequisiteEquipmentRepository };