import { Component } from '@angular/core';
import { MlService } from '../../services/azureml.service';
import { Patient } from './patient';
import { PredictiveResponse } from './predictiveResponse';

@Component({
    selector: 'patient-info',
    templateUrl: 'js/app/components/patient-info/patient-info.html',
    providers: [MlService]
})
export class PatientInfo {
    errorMessage: string;
    public showCancerInfo = false;
    public hasBreastCancer = false
    public patientInfo: Patient = new Patient({ class: 0 });
    public treatmentInfo: any = {};
    constructor(private mlService: MlService) {

    }
    checkBreastCancerDiagnosis() {
        this.mlService.predictiveBreastCancer(this.patientInfo)
            .subscribe(
            predictiveResponse => {
                this.showCancerInfo = true;
                this.hasBreastCancer = !!+predictiveResponse.Results.output1[0]['Scored Labels'];
            },
            error => this.errorMessage = error
            );
    }
    generateTreatment() {
        this.mlService.generateTreatment(this.treatmentInfo)
            .subscribe(
            treatmentResponse => {

            }
            ),
            error => this.errorMessage = error;
    }
}
