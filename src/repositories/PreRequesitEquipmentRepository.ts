import { EntityRepository, Repository } from 'typeorm';
import { PreRequesitEquipment } from '../models/PreRequesitEquipment';

@EntityRepository(PreRequesitEquipment)
class PreRequisiteEquipmentRepository extends Repository<PreRequesitEquipment> {

}

export { PreRequisiteEquipmentRepository };