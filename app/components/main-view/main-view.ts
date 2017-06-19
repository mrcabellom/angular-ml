import { Component, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'main-view',
    templateUrl: "js/app/components/main-view/main-view.html",
})
export class MainView {
    public generatedTreatment: any;
    onNotify(treatment: any): void {
        this.generatedTreatment = treatment;
    }
}
