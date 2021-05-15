import { EntityRepository, Repository } from 'typeorm';
import { Equipment } from '../models/Equipment';

@EntityRepository(Equipment)
class EquipmentRepository extends Repository<Equipment> {

}

export { EquipmentRepository };