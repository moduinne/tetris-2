import { Cell } from './cell';
import { Piece } from './piece';
import { PIECE_T } from './piece-permutations';

const DIM = 30;
const START_X = 4 * DIM;
const START_Y = 0 * DIM;

export class Board {

    public w = 0;
    public h = 0;
    public cellMap = new Map<[Number,Number],Cell>();
    public currentPiece = new Piece(START_X,START_Y, "T", PIECE_T, 0);

    constructor(public cols, public rows) {

        this.w = this.cols * DIM;
        this.h = this.rows * DIM; 
        this.setCellMap();
        this.addPieceToBoard();
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

    getCurrentPiece() {
        return this.currentPiece;
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

    movePieceLeft() {
        this.currentPiece.left();
    }

    movePieceRight() {
        this.currentPiece.right();
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
        let tp: Piece = new Piece(x, y, t, s, n)
        return tp;
    }

    moveIsPossibleLeft() {   
       let test = this.makeTestPiece();
       test.left();
       let xyPositions = test.getXYPositionsOfPiece(test.x, test.y, DIM);
    }

    movePossibleRight() {
        let test = this.makeTestPiece();
        test.right();
        let xyPositions = test.getXYPositionsOfPiece(test.x, test.y, DIM);
    }
    
    movePossibleDown() {
        let test = this.makeTestPiece();
        test.down();
        let xyPositions = test.getXYPositionsOfPiece(test.x, test.y, DIM);
    }
}
