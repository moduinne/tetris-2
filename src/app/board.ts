import { Cell } from './cell';
import { Piece } from './piece';

export class Board {

    public dim = 30;
    public w = 0;
    public h = 0;
    public cellMap = new Map<[Number,Number],Cell>();

    
    constructor(public cols, public rows) {

        //set the dimensions of the board in pixels
        this.w = this.cols * this.dim;
        this.h = this.rows * this.dim; 
        this.setCellMap();

    }

    setCellMap() {
        for(let r = 0 ; r < this.rows ; r ++) {
            for (let c = 0 ; c < this.cols ; c ++) {
                let xy:[Number,Number] = [r * this.dim, c * this.dim];
                let cell:Cell = new Cell(false, 0);
                this.cellMap.set(xy,cell);
            }
        }
    }

    addPieceToBoard(piece:Piece) {
        let xyPiece = piece.getXYPositionsOfPiece(piece.x, piece.y,this.dim);
        for(let xy of xyPiece) {
            this.cellMap.get(xy).isFilled = 1;
        }
    }
    
    clearUnlockedCells() {
        for(let xy of this.cellMap.keys()) {
            if(!this.cellMap.get(xy).isLocked) {
                this.cellMap.get(xy).isFilled = 0;
            }
        }
    }
}
