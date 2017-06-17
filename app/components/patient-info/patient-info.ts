import { Component } from '@angular/core';
import { MlService } from '../../services/azureml.service';

@Component({
    selector: 'patient-info',
    templateUrl: 'js/app/components/patient-info/patient-info.html',
    providers:[MlService]
})
export class PatientInfo {
    errorMessage: string;
    predictiveResponse: any;
    private info: any = {
        "Inputs": {
            "input1": [
                {
                    "id": 1,
                    "clumpThickness": 1,
                    "uniformityCellSize": 1,
                    "uniformityCellShape": 1,
                    "marginalAdhesion": 1,
                    "singleEpithelialCellsize": 1,
                    "bareNuclei": 1,
                    "blandChromatin": 1,
                    "normalNucleoli": 1,
                    "mitoses": 1,
                    "class": 1
                }
            ]
        },
        "GlobalParameters": {}
    };
    constructor(private mlService: MlService) {

    }
    checkBreastCancerDiagnosis() {
        this.mlService.predictiveBreastCancer(this.info)
            .subscribe(
            predictiveResponse => {
                console.log(predictiveResponse);
            },
            error => this.errorMessage = error
            );
    }


}
