import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Patient } from '../components/patient-info/patient';
import { PredictiveResponse } from '../components/patient-info/predictiveResponse';
import { SpinnerService } from "./spinner.service";

@Injectable()
export class MlService {

    private mlServiceBase = '/api/predictiveml';
    private treatmentUrl = '/treatment';
    private readonly errorMessage: string = 'There was an error executing the ML Service';

    constructor(private http: Http, private spinnerService: SpinnerService) { }

    predictiveBreastCancer(info: Patient): Observable<PredictiveResponse> {
        let headers: Headers = this.createHeaders();
        let options = new RequestOptions({ headers: headers });
        this.spinnerService.show();
        return this.http.post(this.mlServiceBase, this.createRequest(info), options)
            .map((res: Response) => {
                let body = res.json();
                this.spinnerService.hide();
                return body;
            })
            .catch((error: Response | any) => {
                this.spinnerService.hide();
                return Observable.throw(this.errorMessage);
            });
    }

    generateTreatment(info: any): Observable<any> {
        let headers: Headers = this.createHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.mlServiceBase}${this.treatmentUrl}`, info, options)
            .map((res: Response) => {
                let body = res.json();
                this.spinnerService.hide();
                return body;
            })
            .catch((error: Response | any) => {
                this.spinnerService.hide();
                return Observable.throw(this.errorMessage);
            });
    }

    private createHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    private createRequest(patientInfo: Patient): any {
        let request = {
            "Inputs": {
                "input1": []
            },
            "GlobalParameters": {}
        };
        request.Inputs.input1.push(patientInfo);
        return request;
    }
}
