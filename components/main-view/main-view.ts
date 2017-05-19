import { Component, ViewEncapsulation } from '@angular/core';
import {MdSnackBar} from "@angular/material";

@Component({
    selector: 'main-view',
    encapsulation: ViewEncapsulation.None,
    templateUrl: '/components/main-view/main-view.html'
})
export class MainView {
    isDarkTheme: boolean = false;
    lastDialogResult: string;

    foods: any[] = [
        { name: 'Pizza', rating: 'Excellent' },
        { name: 'Burritos', rating: 'Great' },
        { name: 'French fries', rating: 'Pretty good' },
    ];

    progress: number = 0;

    constructor(private _snackbar: MdSnackBar) {
        // Update the value for the progress-bar on an interval.
        setInterval(() => {
            this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
        }, 200);
    }
}
