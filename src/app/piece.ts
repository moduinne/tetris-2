import { OnInit } from '@angular/core';
import { Cell } from './cell';
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

    doesntOverlap(board:Cell[]) {
        for(let coor of this.xyCoords){
            for(let cell of board){
                if(coor[0] === cell.posX && coor[1] === cell.posY && cell.isFilled === 1){
                    return false;
                }
            }
        }
        return true;//todo
    }

    getLowestY():number {
        let result:number = 0;
        for(let i = 0 ; i < this.xyCoords.length ; i++) {
            if(this.xyCoords[i][1] > result) {
                result = this.xyCoords[i][1];
            }
        }
        return result;
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
