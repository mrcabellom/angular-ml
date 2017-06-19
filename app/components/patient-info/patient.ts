export class Patient {

    public class: number;
    public id: number;
    constructor(initPatient: any) {
        this.class = initPatient.class;
        this.id = Math.floor((Math.random() * 100) + 1);
    }
}
