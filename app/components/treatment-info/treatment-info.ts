import { Component, ViewEncapsulation, Input } from '@angular/core';
@Component({
    selector: 'treatment-info',
    templateUrl: "js/app/components/treatment-info/treatment-info.html"
})
export class TreatmentInfo {
    @Input() treatment;
    constructor() {
        this.treatment = {};
    }
}