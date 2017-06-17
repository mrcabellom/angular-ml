import * as express from 'express';
import relayRouter from './patientRouter';

let routes: Array<express.RequestHandler> = [
    relayRouter
];

export { routes };
