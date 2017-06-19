import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MainView } from '../components/main-view/main-view';
import { PatientInfo } from '../components/patient-info/patient-info';
import { SpinnerComponent } from '../components/spinner/spinner';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SpinnerService } from '../services/spinner.service';

@NgModule({
    declarations: [MainView, PatientInfo, SpinnerComponent],
    bootstrap: [MainView],
    imports: [
        BrowserModule,
        MaterialModule.forRoot(),
        HttpModule,
        FormsModule,
        JsonpModule,
        RouterModule.forRoot([{ path: '', redirectTo: '', pathMatch: 'full' }], { useHash: true })
    ],
    providers:[
        SpinnerService
    ]
})
class StartupModule {
    constructor() {

    }
}
platformBrowserDynamic().bootstrapModule(StartupModule);
