export interface CharacteristicInterface {
    type: string,
    value: number,
    target: string,
    id: string
}

export interface ReturnResponse {
    id: string,
    name: string,
    description: string,
    benefits: [{

    }],
    pre_requesits: [{

    }]
}

export interface Sheet {
    nome: string,
    race: string,
    class: string,
    age: string,
    des: string,
    hab: {
        FOR: string,
        DES: string,
        CON: string,
        INT: string,
        SAB: string,
        CAR: string
    },
    tes: {
        FOR: string,
        SOR: string,
        REF: string
    },
    sta: {
        CA: string,
        PV: string,
        PM: string
    },
    tam: string,
    div: string,
    tend: string
}


