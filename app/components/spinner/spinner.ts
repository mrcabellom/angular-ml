import { Component, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { Subscription } from 'rxjs/Rx';

@Component({
   selector: 'custom-spinner',
   templateUrl: 'js/app/components/spinner/spinner.html'
})
export class SpinnerComponent implements OnInit, OnDestroy {

    private spinner: any;
    private show: boolean = false;
    private element: any = null;
    private subscription: Subscription = null;
    
    constructor(private spinnerElement: ElementRef,
                private spinnerService: SpinnerService) {
        this.element = spinnerElement.nativeElement;
    }

    ngOnInit() {
       this.createServiceSubscription();
    }

    private createServiceSubscription() {
        this.subscription = this.spinnerService.spinnerObservable.subscribe(show => {
            if (show) {
                this.startSpinner();
            } else {
                this.stopSpinner();
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    startSpinner() {
        this.show = true;
    }

    stopSpinner() {
        this.show = false;
    }
}
