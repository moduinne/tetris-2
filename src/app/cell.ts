export class Cell {

    public colors = ['none', 'blue', 'red', 'green', 'orange'];
    public color = this.colors[0];
    public isFilled;
    public isLocked;

    constructor(isLocked, isFilled){
        this.isFilled = isFilled;
        this.isLocked = isLocked;
        this.color = this.colors[this.isFilled];
    }

    public setIsFilled(num){
        this.isFilled = num;
        this.color = this.colors[this.isFilled];
    }
}
