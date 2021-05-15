import { EntityRepository, Repository } from 'typeorm';
import { BenefitEquipment } from '../models/BenefitEquipment';

@EntityRepository(BenefitEquipment)
class BenefitEquipmentRepository extends Repository<BenefitEquipment> {

}

export { BenefitEquipmentRepository };