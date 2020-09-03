import { T_PERMS, L_PERMS, I_PERMS } from './piece-permutations';

const DIM:number = 30;
export class Piece {

    public xyCoords = [];
    public perms;
    public currentPerm = -1;

    constructor(public initial:number[][], public pieceID:string){
        this.setXYCoords(this.initial);
        this.setPermutations(this.pieceID);
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

    setPermutations(pieceID){
        if(pieceID === "T") {
            this.perms = T_PERMS;
            this.currentPerm = this.perms[0];
        }
        if(pieceID === "L") {
            this.perms = L_PERMS;
            this.currentPerm = this.perms[0];
        }
        if(pieceID === "I"){
            this.perms = I_PERMS;
            this.currentPerm = this.perms[0];
        }
    }

    mutate(){
        //TODO
    }

    getLowestX():number {
        let result:number = 300;
        for(let i = 0 ; i < this.xyCoords.length ; i++) {
            if(this.xyCoords[i][0] < result) {
                result = this.xyCoords[i][0];
            }
        }
        return result;
    }

    getHighestX():number {
        let result:number = 0;
        for(let i = 0 ; i < this.xyCoords.length ; i++) {
            if(this.xyCoords[i][0] > result) {
                result = this.xyCoords[i][0];
            }
        }
        return result;
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
