import { EntityRepository, Repository } from 'typeorm';
import { EquipmentPreRequisite } from '../models/PrerequesitEquipment';

@EntityRepository(EquipmentPreRequisite)
class PreRequisiteEquipmentRepository extends Repository<EquipmentPreRequisite> {

}

export { PreRequisiteEquipmentRepository };