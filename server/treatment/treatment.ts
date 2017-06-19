import { DosesEnum } from './doses.enum';
import { TreatmentRules } from './treatmentRules';
import * as moment from 'moment';

export class Treatment {
    public generatedTreatment: any = {
        regimens: [],
        notifications: []
    };
    public bodySurfaceArea: number;
    public startTreatmentDate: Date;
    public weight: number;
    public height: number;

    constructor(weight: number, height: number, startTreatment: Date) {
        this.height = height;
        this.weight = weight;
        this.calcBodySurfaceArea(weight, height);
        this.startTreatmentDate = startTreatment;
    }

    private calcBodySurfaceArea(weight: number, height: number) {
        this.bodySurfaceArea = Math.sqrt((weight * height) / 3600);
    }

    public generateTreatment() {
        for (let regymen of TreatmentRules.rules.regimens) {
            let regymenTreatment = {};
            regymenTreatment['cycles'] = this.generateRegimenCycles(regymen);
            regymenTreatment['name'] = regymen.name;
            this.generatedTreatment.regimens.push(regymenTreatment);
        }
        for (let notif of TreatmentRules.rules.notifications) {
            this.generatedTreatment.notifications.push(...this.generateNotifications(notif));
        }
        return this.generatedTreatment;
    }

    private generateRegimenCycles(regimen) {
        let treatmentCycles = [];
        let endTreatment = this.startTreatmentDate;
        let regimenCycles = [...regimen.cycles, ...regimen.subsequentCycles];
        let iteration = 0;
        for (let cycle of regimenCycles) {
            let resultCycles = this.generateCycles(cycle, (iteration < regimen.cycles.length)
                ? this.startTreatmentDate : endTreatment);
            treatmentCycles.push(...resultCycles.cycles);
            if (moment(resultCycles.endCycles) > moment(endTreatment)) {
                endTreatment = resultCycles.endCycles;
            }
            iteration = iteration + 1;
        }
        return treatmentCycles;
    }

    private generateCycles(cycleRule: any, startCycles: any): any {
        let startCycleTreatment = moment(startCycles);
        let name = cycleRule.name;
        let cycles = [];
        for (let i = 0; i < cycleRule.repeat; i++) {
            let cycle = this.generateDrugs(cycleRule.drugs, i === 0 ? startCycles.toISOString() : startCycleTreatment.toISOString());
            cycle['name'] = `${name}-${i + 1}`;
            cycles.push(cycle);
            if (i < (cycleRule.repeat - 1)) {
                startCycleTreatment = moment(cycle['start']).add(cycleRule.between, 'day');
            }
        }
        return { cycles: cycles, endCycles: startCycleTreatment };
    }

    private generateDrugs(drugsRule: Array<any>, startCycleDate: any): any {
        let drugs = [], drugDate, endCycleDate = startCycleDate;
        for (let drug of drugsRule) {
            for (let i = 0; i < drug.repeat; i++) {
                let drugGenerated = {};
                drugGenerated['name'] = drug.name;
                drugGenerated['dose'] = this.calculateDoses(drug.calculate, drug.dose);
                drugGenerated['date'] = i === 0 ? moment(startCycleDate).add(drug.startDay, 'day').toISOString()
                    : moment(drugDate).toISOString()
                if (moment(drugGenerated['date']) > moment(endCycleDate)) {
                    endCycleDate = moment(drugGenerated['date']).toISOString();
                }
                drugDate = moment(drugGenerated['date']).add(drug.between, 'day').toISOString();
                drugs.push(drugGenerated);
            }
        }
        return { start: startCycleDate, drugs: drugs, end: endCycleDate };
    }

    private calculateDoses(calculateMode: DosesEnum, dose: number): number {
        let resultDose: number;
        if (calculateMode === DosesEnum.Kg) {
            resultDose = (this.weight * dose);
        } else if (calculateMode === DosesEnum.AreaSurface) {
            resultDose = this.bodySurfaceArea * dose;
        } else {
            resultDose = dose;
        }
        return parseFloat(resultDose.toFixed(2));
    }

    private generateNotifications(notificationsRules: any) {
        let notifications = [];
        let notificationsTreatmentDate;
        for (let iteration = 0; iteration < notificationsRules.repeat; iteration++) {
            let notification = {};
            notification['description'] = notificationsRules.description;
            notification['type'] = notificationsRules.type;
            notification['date'] = iteration === 0 ? moment(this.startTreatmentDate).add(notificationsRules.startDay, 'days').toISOString()
                : moment(notificationsTreatmentDate).toISOString();
            notificationsTreatmentDate = moment(notification['date'] ).add(notificationsRules.between, 'days').toISOString();
            notifications.push(notification);
        }
        return notifications;
    }
}
