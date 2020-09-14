import { Cell } from './cell';
import { Piece } from './piece';
import { PIECE_I, PIECE_O, PIECE_T, PIECE_L, PIECE_IDS } from './piece-permutations';

const DIM = 30;
const START_X = 4 * DIM;
const START_Y = 0 * DIM;

export class Board {

    public w = 0;
    public h = 0;
    public cellMap = new Map<[Number,Number],Cell>();
    public startT = this.generateShapeType();
    public startS = this.getShape(this.startT);
    public currentPiece = new Piece(START_X,START_Y, this.startT, this.startS);

    constructor(public cols, public rows) {

        this.w = this.cols * DIM;
        this.h = this.rows * DIM; 
        this.setCellMap();
        this.addPieceToBoard();
    }

    generateShapeType() {
        return PIECE_IDS[Math.random()*PIECE_IDS.length | 0];
    }

    getShape(s:string) {
        switch(s){
            case "T": return PIECE_T;
            case "O": return PIECE_O;
            case "L": return PIECE_L;
            case "I": return PIECE_I;
            default:
                return "none";
        }
    }

    setCellMap() {
        for(let r = 0 ; r < this.rows ; r ++) {
            for (let c = 0 ; c < this.cols ; c ++) {
                let xy:[Number,Number] = [r * DIM, c * DIM];
                let cell:Cell = new Cell(false, 0);
                this.cellMap.set(xy,cell);
            }
        }
    }

    addPieceToBoard() {
        let xyPiece = this.currentPiece.getXYPositionsOfPiece(this.currentPiece.getCenterX(), this.currentPiece.getCenterY(), DIM);
        for(let i = 0 ; i  < xyPiece.length ; i++){
            let xy = xyPiece[i];
            for(let k of this.cellMap.keys()) {
                if(JSON.stringify(xy) === JSON.stringify(k)){
                    this.cellMap.get(k).setIsFilled(1);
                }
            }
        }
    }

    private lockPieceToCells() {
        let xyCoords = this.currentPiece.getXYPositionsOfPiece(this.currentPiece.x, this.currentPiece.y, DIM);
        for(let i = 0 ; i < xyCoords.length ; i++) {
            let pxy = xyCoords[i];
            for(let k of this.cellMap.keys()) {
                if(JSON.stringify(k) === JSON.stringify(pxy)) {
                     this.cellMap.get(k).isLocked = true;
                }
            }
        }
    }

    posEqualTo(pos1, pos2) {
        if(JSON.stringify(pos1) === JSON.stringify(pos2)) {
            return true;
        }
        return false;
    }

    willOverLapDown() {
        let test:Piece = this.makeTestPiece();
        test.down();
        let xyArr = test.getXYPositionsOfPiece(test.x, test.y, DIM);
        for(let i = 0 ; i < xyArr.length ; i++) {
            let xy = xyArr[i];
            for(let k of this.cellMap.keys()) {
                if(this.posEqualTo(xy, k)){
                    let cell:Cell = this.cellMap.get(k);
                    if(cell.isLocked) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    willOverLapLeft() {
        let test:Piece = this.makeTestPiece();
        test.left();
        let xyArr = test.getXYPositionsOfPiece(test.x, test.y, DIM);
        for(let i = 0 ; i < xyArr.length ; i++) {
            let xy = xyArr[i];
            for(let k of this.cellMap.keys()) {
                if(this.posEqualTo(xy, k)){
                    let cell:Cell = this.cellMap.get(k);
                    if(cell.isLocked) {
                        return true;
                    }
                }
            }
        }
        return false; 
    }

    willOverLapRight() {
        let test:Piece = this.makeTestPiece();
        test.right();
        let xyArr = test.getXYPositionsOfPiece(test.x, test.y, DIM);
        for(let i = 0 ; i < xyArr.length ; i++) {
            let xy = xyArr[i];
            for(let k of this.cellMap.keys()) {
                if(this.posEqualTo(xy, k)){
                    let cell:Cell = this.cellMap.get(k);
                    if(cell.isLocked) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    needsToSpawn():Boolean {
        let xyCoords = this.currentPiece.getXYPositionsOfPiece(this.currentPiece.x, this.currentPiece.y, DIM);
        for(let xy of xyCoords) {
            if(xy[1] === ((this.cols * DIM) - DIM) || this.willOverLapDown()) {
                return true;
            } 
        }
        return false;
    }

    lockAndSpawn() {
        this.lockPieceToCells();
        let t = this.generateShapeType();
        let s = this.getShape(t);
        this.currentPiece = new Piece(START_X, START_Y, t, s);
    }
    
    reset(){
        for(let k of this.cellMap.keys()) {
            let cell = this.cellMap.get(k);
            cell.setIsFilled(0);
        }
    }

    getFilledCells() {
        let result = [];
        for(let xy of this.cellMap.keys()){
            if(this.cellMap.get(xy).isFilled > 0 || this.cellMap.get(xy).isLocked){
                result.push(xy);
            }
        }
        return result;
    }

    mutatePiece() {
        if(this.mutateIsLegit()){
            this.currentPiece.mutate();
        }
    }

    movePieceLeft() {
        if(this.moveIsPossibleLeft()) {
            this.currentPiece.left();
        }
    }

    movePieceRight() {
        if(this.moveIsPossibleRight()) {
            this.currentPiece.right();
        }
    }

    movePieceDown() {
        this.currentPiece.down();
    }

    makeTestPiece() : Piece {
        let x = this.currentPiece.x;
        let y = this.currentPiece.y;
        let t = this.currentPiece.type;
        let s = this.currentPiece.shapes;
        let n = this.currentPiece.shapeNum;
        let tp: Piece = new Piece(x, y, t, s)
        tp.shapeNum = n;
        return tp;
    }

    mutateIsLegit() {
        let test = this.makeTestPiece();
        test.mutate();
        for(let xy of test.getXYPositionsOfPiece(test.x, test.y, DIM)) {
            if(xy[0] < 0 || xy[0] > 300) {
                return false;
            }
        }
        return true;
    }


    moveIsPossibleLeft() {
        if(this.willOverLapLeft()) {
            return false;
        }
        let test = this.makeTestPiece();
        test.left();
        let xyPositions = test.getXYPositionsOfPiece(test.x, test.y, DIM);
        for(let xy of xyPositions) {
            if(xy[0] < 0) {
                return false;
            }
        }
        return true;
    }

    moveIsPossibleRight() {
        if(this.willOverLapRight()) {
            return false; 
        }
        let test = this.makeTestPiece();
        test.right();
        let xyPositions = test.getXYPositionsOfPiece(test.x, test.y, DIM);
        for(let xy of xyPositions) {
            if(xy[0] > 300) {
                return false;
            }
        }
        return true;
    }
}
