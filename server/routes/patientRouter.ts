import * as express from 'express';
import { AppSettings } from '../../settings';
import * as urllib from 'urllib-sync';

let patientRouter = express.Router();

patientRouter.get('/', (request: express.Request, response: express.Response) => {
    response.render('index.html');
});

patientRouter.post('/api/predictiveml', (request: express.Request, response: express.Response) => {
    let responseML = urllib.request(AppSettings.URLMLSERVICE, {
        method: 'POST',
        headers:{
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + AppSettings.KEY
        },
        data: request.body
    });
    if(responseML.error){
        response.status(500).send(responseML.error.details);
    }else{
        response.status(200).jsonp(JSON.parse(responseML.data.toString()));
    }
});

patientRouter.post('/api/predictiveml/treatment', (request: express.Request, response: express.Response) => {
    
});

export default patientRouter;
