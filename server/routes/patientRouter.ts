import * as express from 'express';
import { AppSettings } from '../../settings';
import * as urllib from 'urllib-sync';
import { Treatment } from '../treatment/treatment';
import * as fs from 'fs';

let patientRouter = express.Router();

patientRouter.get('/', (request: express.Request, response: express.Response) => {
    response.render('index.html');
});

patientRouter.post('/api/predictiveml', (request: express.Request, response: express.Response) => {
    let responseML = urllib.request(AppSettings.URLMLSERVICE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AppSettings.KEY
        },
        data: request.body
    });
    if (responseML.error) {
        response.status(500).send(responseML.error.details);
    } else {
        response.status(200).jsonp(JSON.parse(responseML.data.toString()));
    }
});

patientRouter.post('/api/predictiveml/treatment', (request: express.Request, response: express.Response) => {
    let treatment = new Treatment(request.body.weight, request.body.height, new Date())
    let generated = treatment.generateTreatment();
    fs.writeFile('treatment_generated.json', JSON.stringify(generated));
    response.status(200).jsonp(generated);
});

export default patientRouter;
