import { OnInit } from '@angular/core';
const DIM:number = 30;

export class Piece {

    public xyCoords = [];

    constructor(
        public initial:number[][]
    ){
        this.setXYCoords(this.initial);
    }

    setXYCoords(init:number[][]){
        for(let y = 0 ; y < init.length ; y ++) {
            for(let x = 0 ; x < init[y].length ; x ++) {
                if(init[y][x] > 0) {
                    let xy:number[] = [];
                    let posX = (x + 3) * DIM;
                    let posY = y * DIM
                    xy.push(posX)
                    xy.push(posY);
                    this.xyCoords.push(xy);
                }
            }
        }
    }

    moveRight() {
        let newXYCoords:number[][] = [];
        for(let i = 0 ; i < this.xyCoords.length ; i++) {
            let xy:number[] = [];
            let posX = this.xyCoords[i][0] + DIM;
            let posY = this.xyCoords[i][1];
            xy.push(posX);
            xy.push(posY);
            newXYCoords.push(xy);
        }
        this.xyCoords = newXYCoords;
    }

    moveLeft() {
        let newXYCoords:number[][] = [];
        for(let i = 0 ; i < this.xyCoords.length ; i++) {
            let xy:number[] = [];
            let posX = this.xyCoords[i][0] - DIM;
            let posY = this.xyCoords[i][1];
            xy.push(posX);
            xy.push(posY);
            newXYCoords.push(xy);
        }
        this.xyCoords = newXYCoords;
    }

    moveDown(){
        let newXYCoords:number[][] = [];
        for(let i = 0 ; i < this.xyCoords.length ; i++) {
            let xy:number[] = [];
            let posX = this.xyCoords[i][0];
            let posY = this.xyCoords[i][1] + DIM;
            xy.push(posX);
            xy.push(posY);
            newXYCoords.push(xy);
        }
        this.xyCoords = newXYCoords;
    }
}
