import { Cell } from './cell';

export class Board {

    public dim = 30;
    public w = 0;
    public h = 0;
    public rowMap = new Map<Number, Cell[]>();
    public colMap = new Map<Number, Cell[]>();

    
    constructor(public cols,public rows) {

        //set the dimensions of the board in pixels
        this.w = this.cols * this.dim;
        this.h = this.rows * this.dim; 
        //set the maps associated with the cells 
        this.setRowMap();
        this.setColMap();
        
    }

    //sets up a map of rows where key = row and value = cell list
    setRowMap() {
        for(let i = 0 ; i < this.rows ; i++) {
            let cells:Cell[] = [];
            for(let c = 0 ; c < this.cols ; c++) {
                cells.push(new Cell(false,0,c*this.dim,i));
            }
            this.rowMap.set(i,cells);
        }
    }

    setColMap() {
        for(let i  = 0 ; i < this.cols ; i++) {
            let cells:Cell[] = [];
            for(let r = 0 ; r < this.rows; r++) {
                cells.push(new Cell(false,0,r*this.dim,i));
            }
            this.colMap.set(i,cells);
        }
    }

    getRow(rowNum):Cell[] {
        return this.rowMap.get(rowNum);
    }

    getCol(colNum):Cell[] {
        return this.colMap.get(colNum);
    }

    removeRow(rowNum){
        let cells:Cell[] = this.rowMap.get(rowNum);
        for(let i = 0 ; i < cells.length; i++) {
            let cell:Cell = cells[i];
            cell.isFilled = 0;
            cell.isLocked = false;
        }
    }

    rowIsFull():Boolean {
        for(let i  = 0 ; i < this.rowMap.size ; i++) {
            for(let c = 0 ; c < this.getRow(i).length ;c ++) {
                if(!this.getRow(i)[c].isLocked){
                    return false;
                }
            }
        }
        return true;
    }
}
