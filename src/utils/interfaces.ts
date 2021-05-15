// Class Hability
export interface CharacteristicClassHabilityArrayInterface {
    benefit: CharacteristicClassHabilityInterface,
    pre_requesit: CharacteristicClassHabilityInterface
}

export interface CharacteristicClassHabilityInterface {
    type: string,
    value: number,
    target: string,
    classHability: string
}

// Equipment
export interface CharacteristicEquipmentArrayInterface {
    benefit: CharacteristicEquipmentInterface,
    pre_requesit: CharacteristicEquipmentInterface
}

export interface CharacteristicEquipmentInterface {
    type: string,
    value: number,
    target: string,
    equipment: string
}

// Magic
export interface CharacteristicMagicArrayInterface {
    benefit: CharacteristicMagicInterface,
    pre_requesit: CharacteristicMagicInterface
}

export interface CharacteristicMagicInterface {
    type: string,
    value: number,
    target: string,
    magic: string
}

// Talent
export interface CharacteristicTalentArrayInterface {
    benefit: CharacteristicTalentInterface,
    pre_requesit: CharacteristicTalentInterface
}

export interface CharacteristicTalentInterface {
    type: string,
    value: number,
    target: string,
    talent: string
}

// Race
export interface CharacteristicRaceHabilityArrayInterface {
    benefit: CharacteristicRaceHabilityInterface,
    pre_requesit: CharacteristicRaceHabilityInterface
}

export interface CharacteristicRaceHabilityInterface {
    type: string,
    value: number,
    target: string,
    raceHability: string
}
