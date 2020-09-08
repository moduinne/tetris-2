export class Cell {

    public colors = ['none', 'blue', 'red', 'green', 'orange'];
    public color = this.colors[0];

    constructor(
        public isLocked:boolean,
        public isFilled:number
        // public posX:number,
        // public posY:number
    ){
        this.color = this.colors[this.isFilled];
    }
}
