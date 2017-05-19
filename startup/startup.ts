import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MainView } from '../components/main-view/main-view';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

@NgModule({
    declarations: [MainView],
    bootstrap: [MainView],
    imports: [
        BrowserModule,
        MaterialModule.forRoot(),
        RouterModule.forRoot([{ path: '', redirectTo: '', pathMatch: 'full' }], { useHash: true })
    ],
})
class StartupModule {
    constructor() {

    }
}

platformBrowserDynamic().bootstrapModule(StartupModule);