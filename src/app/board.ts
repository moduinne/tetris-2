import { Cell } from './cell';
import { Piece } from './piece';
import { PIECE_I, PIECE_O, PIECE_T, PIECE_L, PIECE_IDS, PIECE_Z } from './piece-permutations';

const DIM = 30;
const START_X = 4 * DIM;
const START_Y = 0 * DIM;

export class Board {

    public gameOver = false;
    public score = 0;
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

    getScore() {
        return this.score;
    }

    /**returns a map of row num keys pointing to cell array of that row values of current board */
    getRowMapFromBoard():Map<number,Cell[]> {
        let rowMap = new Map<number, Cell[]>();
        for(let i = 0 ; i < this.cols ; i++) {
            let y = i * DIM;
            let arr:Cell[] = [];
            for(let k of this.cellMap.keys()) {
                if(k[1] === y) {
                    arr.push(this.cellMap.get(k))
                }
            }
            rowMap.set(i, arr);
        }
        return rowMap;
    }

    /**returns true if a the row of cells ar is completely full */
    rowIsFull(cellArr:Cell[]):Boolean {
        for(let i = 0 ; i < cellArr.length ; i++) {
            if(!cellArr[i].isLocked){
                return false;
            }
        }
        return true;
    }

    getFullKeys() {
        let fullKeys = [];
        let map = this.getRowMapFromBoard();
        for(let k of map.keys()) {
            if(this.rowIsFull(map.get(k))) {
                let y = k*DIM;
                for(let j = 0 ; j < this.rows ; j++) {
                    fullKeys.push([j * DIM, y]);
                }
            }
        }
        return fullKeys;
    }

    removeLines(keyArr) {
        let keysToDrop = [];
        let dropDim = (keyArr.length/11) * DIM;
        let lowestNum = 4000;
        for(let i  = 0 ; i < keyArr.length ; i++) {
            let key = keyArr[i];
            if(key[1] < lowestNum) {
                lowestNum = key[1];
            }
            for(let k of this.cellMap.keys()) {
                if(this.posEqualTo(key, k)) {
                    this.cellMap.get(k).isLocked = false;
                    this.cellMap.get(k).isFilled = 0;
                }
            } 
        }
        //MIGHT BUG WITH LINES REMOVED WITH MIDDLE LINE INTACT
        for(let m of this.cellMap.keys()) {
            if(m[1] < lowestNum && this.cellMap.get(m).isLocked) {
                keysToDrop.push(m);
            }
        }
        this.processOldKeys(keysToDrop);
        this.processNewKeys(this.getNewKeys(keysToDrop, dropDim));
        this.score += (dropDim/DIM);
    }

    /**returns the new set of keys for cells left over after row removal */
    getNewKeys(keys, dimension){
        let result = [];
        for(let i  = 0 ; i < keys.length ; i ++) {
            result.push([keys[i][0] , keys[i][1] + dimension]);
        }
        return result;
    }

    /**takes a list of keys let after row removal and sets cells to locked as true after moving */
    processNewKeys(keys) {
        for(let i = 0 ; i < keys.length ; i++) {
            let key = keys[i]
            for(let k of this.cellMap.keys()){
                if(this.posEqualTo(k, key)){
                    this.cellMap.get(k).isLocked = true;
                }
            }
        }
    }

    /**takes a list of keys for row removal and sets cells to locked as false */
    processOldKeys(keys){
        for(let i = 0 ; i < keys.length ; i++) {
            let key = keys[i]
            for(let k of this.cellMap.keys()){
                if(this.posEqualTo(k, key)){
                    this.cellMap.get(k).isLocked = false;
                }
            }
        }
    }

    /**generates randomnly they piece type from the piece id constant array */
    generateShapeType() {
        return PIECE_IDS[Math.random()*PIECE_IDS.length | 0];
    }

    /**returns the correct set of permutations for a piece based on the type arg */
    getShape(s:string) {
        switch(s){
            case "T": return PIECE_T;
            case "O": return PIECE_O;
            case "L": return PIECE_L;
            case "I": return PIECE_I;
            case "Z": return PIECE_Z;
            default:
                return "none";
        }
    }

    /**Maps cells values to the xy coordinate keys*/
    setCellMap() {
        for(let r = 0 ; r < this.rows ; r ++) {
            for (let c = 0 ; c < this.cols ; c ++) {
                let xy:[Number,Number] = [r * DIM, c * DIM];
                let cell:Cell = new Cell(false, 0);
                this.cellMap.set(xy,cell);
            }
        }
    }

    /**Adds the piece to the board based on xy coordinates and fills those cells of board */
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

    /**locks cells on board associated with the current piece positions */
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
        let cells:Cell[] = this.getRowMapFromBoard().get(0);
        for(let c of cells) {
            if(c.isLocked) {
                console.log("GAME-OVER!!!!!!!!!!!!!!!")
                this.gameOver = true;
            }
        }
    }

    /**returns true if two xy coordinates are the same */
    posEqualTo(pos1, pos2) {
        if(JSON.stringify(pos1) === JSON.stringify(pos2)) {
            return true;
        }
        return false;
    }

    /**returns true if there is an overlap due to mutation */
    willOverLapMutate() {
        let test:Piece = this.makeTestPiece();
        test.mutate();
        let xyArr = test.getXYPositionsOfPiece(test.x, test.y, DIM);
        for(let pxy of xyArr) {
            for(let k of this.cellMap.keys()) {
                if(this.posEqualTo(pxy, k) && this.cellMap.get(k).isLocked){
                    return true;
                }
            }
        }
        return false;
    }

    /**returns true if moving down will cause an overlap */
    willOverLapDown() {
        let test:Piece = this.makeTestPiece();
        test.down();
        let xyArr = test.getXYPositionsOfPiece(test.x, test.y, DIM);
        for(let pxy of xyArr) {
            for(let k of this.cellMap.keys()) {
                if(this.posEqualTo(pxy, k) && this.cellMap.get(k).isLocked){
                    return true;
                }
            }
        }
        return false;
    }

    /**returns true if by moving left there will be an overlap */
    willOverLapLeft() {
        let test:Piece = this.makeTestPiece();
        test.left();
        let xyArr = test.getXYPositionsOfPiece(test.x, test.y, DIM);
        for(let pxy of xyArr) {
            for(let k of this.cellMap.keys()) {
                if(this.posEqualTo(pxy, k) && this.cellMap.get(k).isLocked){
                   return true;
                }
            }
        }
        return false; 
    }

    /**returns true if by moving right there will be an overlap */
    willOverLapRight() {
        let test:Piece = this.makeTestPiece();
        test.right();
        let xyArr = test.getXYPositionsOfPiece(test.x, test.y, DIM);
        for(let pxy of xyArr) {
            for(let k of this.cellMap.keys()) {
                if(this.posEqualTo(pxy, k) && this.cellMap.get(k).isLocked){
                    return true;
                }
            }
        }
        return false;
    }

    /**returns true if there needs to be a new piece spawned */
    needsToSpawn():Boolean {
        let xyCoords = this.currentPiece.getXYPositionsOfPiece(this.currentPiece.x, this.currentPiece.y, DIM);
        for(let xy of xyCoords) {
            if(xy[1] === ((this.cols * DIM) - DIM) || this.willOverLapDown()) {
                return true;
            } 
        }
        return false;
    }

    /**locks cells on the board and spawns the next newly made piece */
    lockAndSpawn() {
        this.lockPieceToCells();
        let t = this.generateShapeType();
        let s = this.getShape(t);
        this.currentPiece = new Piece(START_X, START_Y, t, s);
    }
    
    /**changes all cells on the board to have a fill property of 0 */
    reset(){
        for(let k of this.cellMap.keys()) {
            let cell = this.cellMap.get(k);
            cell.setIsFilled(0);
        }
    }

    /**returns a list of filled and locked cells on the board*/
    getFilledCells() {
        let result = [];
        for(let xy of this.cellMap.keys()){
            if(this.cellMap.get(xy).isFilled > 0 || this.cellMap.get(xy).isLocked){
                result.push(xy);
            }
        }
        return result;
    }

    /**if not constrained will use piece mutation method */
    mutatePiece() {
        if(this.mutateIsLegit()){
            this.currentPiece.mutate();
        }
    }

    /**moves the current piece left */
    movePieceLeft() {
        if(this.moveIsPossibleLeft()) {
            this.currentPiece.left();
        }
    }

    /**moves the current piece right */
    movePieceRight() {
        if(this.moveIsPossibleRight()) {
            this.currentPiece.right();
        }
    }

    /**moves the currentPiece down */
    movePieceDown() {
        this.currentPiece.down();
    }

    /**creates a piece from the current piece with no alias for testing legitamacy of moves */
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

    /**returns true iff the mutation wont cause an overlap or out of bounds event */
    mutateIsLegit() {
        if(this.willOverLapMutate()) {
            return false;
        }
        let test = this.makeTestPiece();
        test.mutate();
        for(let xy of test.getXYPositionsOfPiece(test.x, test.y, DIM)) {
            if(xy[0] < 0 || xy[0] > 300) {
                return false;
            }
        }
        return true;
    }

    /**returns true if moving left is possible based on constraints */
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

    /**returns true iff moving right is possible based on constraints */
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
