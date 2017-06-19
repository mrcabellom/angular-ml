import { DosesEnum } from "./doses.enum"

export class TreatmentRules {
    static readonly rules = {
        notifications: [
            {
                type: "info",
                description: "Require cardiac monitoring",
                startDay: 90,
                repeat: 3,
                between: 90,
            }
        ],
        regimens: [
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
                            startDay: 0,
                            repeat: 1,
                            between: 1
                        },
                        {
                            name: 'Cyclophosphamide',
                            dose: 600,
                            calculate: DosesEnum.AreaSurface,
                            startDay: 0,
                            repeat: 1,
                            between: 1
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
                            startDay: 0,
                            repeat: 1,
                            between: 1
                        },
                        {
                            name: 'Trastuzumab',
                            dose: 4,
                            calculate: DosesEnum.Kg,
                            startDay: 0,
                            repeat: 1,
                            between: 1
                        }
                    ]
                }]

            },
            {
                name: 'Dose-dense AC+Paclitaxel+Trastuzumab',
                cycles: [{
                    name: 'Dose-dense AC',
                    repeat: 4,
                    between: 21,
                    drugs: [
                        {
                            name: 'Doxorubicin',
                            dose: 60,
                            calculate: DosesEnum.AreaSurface,
                            startDay: 0,
                            repeat: 1,
                            between: 1
                        },
                        {
                            name: 'Cyclophosphamide',
                            dose: 600,
                            calculate: DosesEnum.AreaSurface,
                            startDay: 0,
                            repeat: 1,
                            between: 1
                        },
                        {
                            name: 'Pegfilgrastim',
                            dose: 6,
                            calculate: DosesEnum.None,
                            startDay: 1,
                            repeat: 1,
                            between: 1
                        },
                        {
                            name: 'Filgrastim',
                            dose: 5,
                            calculate: DosesEnum.Kg,
                            startDay: 2,
                            repeat: 8,
                            between: 1
                        }
                    ]
                }],
                subsequentCycles: [{
                    name: 'Dose-dense SC Paclitaxel',
                    repeat: 4,
                    between: 14,
                    drugs: [
                        {
                            name: 'Paclitaxel',
                            dose: 80,
                            calculate: DosesEnum.AreaSurface,
                            startDay: 0,
                            repeat: 1,
                            between: 1
                        },
                        {
                            name: 'Pegfilgrastim',
                            dose: 6,
                            calculate: DosesEnum.None,
                            startDay: 1,
                            repeat: 1,
                            between: 1
                        },
                        {
                            name: 'Filgrastim',
                            dose: 5,
                            calculate: DosesEnum.Kg,
                            startDay: 2,
                            repeat: 8,
                            between: 1
                        }
                    ]
                },
                {
                    name: 'Dose-dense SC Trastuzumab',
                    repeat: 4,
                    between: 14,
                    drugs: [
                        {
                            name: 'Trastuzumab',
                            dose: 4,
                            calculate: DosesEnum.Kg,
                            startDay: 0,
                            repeat: 1,
                            between: 1
                        }
                    ]
                }]

            }
        ]
    }
}
