import { T_PERMS, L_PERMS, I_PERMS } from './piece-permutations';
const SCALE = 1;
const DIM:number = 30/SCALE;
export class Piece {

    public xyCoords = [];
    public perms;
    public permNum = 0;
    public currentPerm;

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
            this.currentPerm = this.perms[this.permNum];
        }
        if(pieceID === "L") {
            this.perms = L_PERMS;
            this.currentPerm = this.perms[this.permNum];
        }
        if(pieceID === "I"){
            this.perms = I_PERMS;
            this.currentPerm = this.perms[this.permNum];
        }
    }

    testMutationI():Number[][] {
        let testList = []
        if(this.permNum === 0) {
            let x0 = this.xyCoords[0][0] + DIM;
            let y0 = this.xyCoords[0][1] - DIM;
            let x2 = this.xyCoords[2][0] - DIM;
            let y2 = this.xyCoords[2][1] + DIM;
            let newXYPos0 = [x0,y0];
            let newXYPos2 = [x2,y2];
            testList.push(newXYPos0, newXYPos2);
        } 
        else if (this.permNum === 1) {
            let x0 = this.xyCoords[0][0] - DIM;
            let y0 = this.xyCoords[0][1] + DIM;
            let x2 = this.xyCoords[2][0] + DIM;
            let y2 = this.xyCoords[2][1] - DIM;
            let newXYPos0 = [x0,y0];
            let newXYPos2 = [x2,y2];
            testList.push(newXYPos0, newXYPos2);
        }
        //console.log(testList);
        return testList;
    }

    

    mutateI(){
        if(this.permNum === 0) {
            let x0 = this.xyCoords[0][0] + DIM;
            let y0 = this.xyCoords[0][1] - DIM;
            let x2 = this.xyCoords[2][0] - DIM;
            let y2 = this.xyCoords[2][1] + DIM;
            let newXYPos0 = [x0,y0];
            let newXYPos2 = [x2,y2];
            this.xyCoords[0] = newXYPos0;
            this.xyCoords[2] = newXYPos2;
            this.permNum += 1;
        } else {
            let x0 = this.xyCoords[0][0] - DIM;
            let y0 = this.xyCoords[0][1] + DIM;
            let x2 = this.xyCoords[2][0] + DIM;
            let y2 = this.xyCoords[2][1] - DIM;
            let newXYPos0 = [x0,y0];
            let newXYPos2 = [x2,y2];
            this.xyCoords[0] = newXYPos0;
            this.xyCoords[2] = newXYPos2;
            this.permNum = 0;
        }
    }

    testMutationT():Number[][] {
        let testList = [];
        if(this.permNum === 0) {
            let x = this.xyCoords[3][0] - DIM;
            let y = this.xyCoords[3][1] +DIM;
            testList.push([x,y]);
        }
        else if(this.permNum === 1) {
            let x = this.xyCoords[0][0] + DIM;
            let y = this.xyCoords[0][1] + DIM;
            testList.push([x,y]);
        }
        else if(this.permNum === 2) {
            let x = this.xyCoords[1][0] + DIM;
            let y = this.xyCoords[1][1] - DIM;
            testList.push([x,y]);
        }
        else if(this.permNum === 3) {
            let x3 = this.xyCoords[3][0] + DIM;
            let y3 = this.xyCoords[3][1] - DIM;
            let x0 = this.xyCoords[0][0] - DIM;
            let y0 = this.xyCoords[0][1] - DIM;
            let x1 = this.xyCoords[1][0] - DIM;
            let y1 = this.xyCoords[1][1] + DIM;
            testList.push([x3,y3], [x0,y0],[x1,y1]);
        }
        return testList;
    }

    mutateT(){
        if(this.permNum === 0) {
            this.permNum += 1;
            let x = this.xyCoords[3][0] -= DIM;
            let y = this.xyCoords[3][1] += DIM;
            let newXYPos = [x,y]
            this.xyCoords[3] = newXYPos;
        }
        else if(this.permNum === 1) {
            this.permNum += 1;
            let x = this.xyCoords[0][0] += DIM;
            let y = this.xyCoords[0][1] += DIM;
            let newXYPos = [x,y]
            this.xyCoords[0] = newXYPos;
        }
        else if(this.permNum === 2) {
            this.permNum += 1;
            let x = this.xyCoords[1][0] += DIM;
            let y = this.xyCoords[1][1] -= DIM;
            let newXYPos = [x,y]
            this.xyCoords[1] = newXYPos;
        }
        else {
            this.permNum = 0;
            this.xyCoords[3][0] += DIM;
            this.xyCoords[3][1] -= DIM;
            this.xyCoords[0][0] -= DIM;
            this.xyCoords[0][1] -= DIM;
            this.xyCoords[1][0] -= DIM;
            this.xyCoords[1][1] += DIM;
        }
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
