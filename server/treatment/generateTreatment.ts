import { Treatment } from './treatment';
import * as fs from 'fs';

let treatment = new Treatment(100, 187, new Date())
let generated = treatment.generateTreatment();
fs.writeFile('treatment_generated.json',JSON.stringify(generated));
