import { DosesEnum } from "./doses.enum"

export class TreatmentRules {
    static readonly rules = {
        Regimems: [
            {
                name: 'AC+Paclitaxel+Trastuzumab',
                cycles: [{
                    name: 'AC',
                    repeat: 4,
                    between: 21,
                    drugs: [
                        {
                            name: 'Doxorubicin',
                            dose: 60,
                            calculate: DosesEnum.AreaSurface,
                            startDay: 0
                        },
                        {
                            name: 'Cyclophosphamide',
                            dose: 600,
                            calculate: DosesEnum.AreaSurface,
                            startDay: 0
                        }
                    ]
                }],
                subsequentCycles: [{
                    name: 'SC Paclitaxel + Trastuzumab',
                    repeat: 12,
                    between: 7,
                    drugs: [
                        {
                            name: 'Paclitaxel',
                            dose: 80,
                            calculate: DosesEnum.AreaSurface,
                            startDay: 0
                        },
                        {
                            name: 'Trastuzumab',
                            dose: 600,
                            calculate: DosesEnum.Kg,
                            startDay: 0
                        }
                    ]
                }]

            }
        ]
    }
}
