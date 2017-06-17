import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MlService {

    private mlServiceUrl = '/api/predictiveml';
    private readonly errorMessage: string = 'There was an error executing the ML Service';

    constructor(private http: Http) { }

    predictiveBreastCancer(info: any): Observable<any> {
        let headers: Headers = this.createHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.mlServiceUrl, info, options)
            .map((res: Response) => {
                let body = res.json();
                return body.data || {};
            })
            .catch((error: Response | any) => {
                return Observable.throw(this.errorMessage);
            });
    }

    private createHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}
