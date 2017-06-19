import { DosesEnum } from './doses.enum';
import { TreatmentRules } from './treatmentRules';
import * as moment from 'moment';

export class Treatment {
    public generatedTreatment: any = {
        regimens: [{
            cycles: []
        }]
    };
    public bodySurfaceArea: number;
    public startTreatmentDate: Date;
    private currentTreatmentDate: any;
    public weight: number;
    public height: number;

    constructor(weight: number, height: number, startTreatment: Date) {
        this.height = height;
        this.weight = weight;
        this.calcBodySurfaceArea(weight, height);
        this.startTreatmentDate = startTreatment;
        this.currentTreatmentDate = startTreatment;
    }

    private calcBodySurfaceArea(weight: number, height: number) {
        this.bodySurfaceArea = Math.sqrt((weight * height) / 3600);
    }

    public generateTreatment() {
        let rulesRegimen = TreatmentRules.rules.Regimems[0];
        this.generatedTreatment.regimens[0].name = rulesRegimen.name;
        for (let cycle of rulesRegimen.cycles) {
            let resultCycles = this.generateCycle(cycle);
            this.generatedTreatment.regimens[0].cycles.push(...resultCycles);
        }
        return this.generatedTreatment;
    }

    private generateCycle(cycleRule: any): any {
        let name = cycleRule.name;
        let cycles = [];
        for (let i = 0; i < cycleRule.repeat; i++) {
            let cycle = {};
            cycle['name'] = `${name}-${i + 1}`;
            cycle['start'] = this.currentTreatmentDate;
            cycle['drugs'] = [];
            for (let drug of cycleRule.drugs) {
                let drugGenerated = {};
                drugGenerated['name'] = drug.name;
                drugGenerated['dose'] = this.calculateDoses(drug.calculate, drug.dose);
                drugGenerated['date'] = moment(cycle['start']).add(drug.startDate, 'day').toString();
                cycle['end'] = drugGenerated['date']
                cycle['drugs'].push(drugGenerated);
            }
            cycles.push(cycle);
            this.currentTreatmentDate = moment(this.currentTreatmentDate).add(cycleRule.between, 'day');
        }
        return cycles;
    }

    private calculateDoses(calculateMode: DosesEnum, dose: number): number {
        let resultDose: number;
        if (calculateMode === DosesEnum.Kg) {
            resultDose = (this.weight * dose);
        } else if (calculateMode === DosesEnum.AreaSurface) {
            resultDose = this.bodySurfaceArea * dose;
        }
        return dose;
    }
}
