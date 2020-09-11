const DIM = 30;

export class Piece {

    public shapes;          //the permutations list
    public shapeNum = 0;    //the index for the permutation
    public type;            //the type symbol  
    public x;               //masterblock x coord
    public y;               //masterblock y coord

    constructor(posX,posY,type,shapes){
        this.x = posX;
        this.y = posY;
        this.type = type;
        this.shapes = shapes;
    }

    getCenterX() {
        return this.x;
    }

    getCenterY() {
        return this.y;
    }

    getType() {
        return this.type;
    }

    private getFilledRowColPairsForPermutation(shapeNum) {
        let result = [];
        let perm = this.shapes[shapeNum];
        for(let row = 0 ; row < perm.length ; row++) {
            for(let col = 0 ; col < perm[row].length ; col++) {
                let rcPair:[number,number] = [row,col]; //row,col tuple
                let val = perm[row][col];
                if(val > 0) {
                    result.push(rcPair);
                }
            }
        }
        return result;
    }

    getXYPositionsOfPiece(centerX:number, centerY:number, dim:number) {
        let xyPositions = [];
        let filledRCPairs = this.getFilledRowColPairsForPermutation(this.shapeNum);
        for(let i  = 0 ; i < filledRCPairs.length ; i++) {
            let xPos = 0;
            let yPos = 0;
            let rcPair = filledRCPairs[i];
            let r = rcPair[0];
            let c = rcPair[1];
            if(c < 1 ) {
                xPos = centerX - dim;
            }
            if(c > 1) {
                xPos = centerX + dim;
            }
            if(c === 1) {
                xPos = centerX;
            }
            if(r < 1) {
                yPos = centerY - dim;
            }
            if(r > 1) {
                yPos = centerY + dim;
            }
            if(r === 1){
                yPos = centerY;
            }
            let xy:[Number,Number] = [xPos, yPos];
            xyPositions.push(xy);
        }
        return xyPositions;
    }

    //moves backwards through ShapeNum numbers
    decrementShapeNum(){
        if(this.shapeNum === 0) {
            this.shapeNum = this.shapes.length-1;
        } else {
            this.shapeNum -= 1;
        }
    }

    //moves forwards through ShapeNum nums
    incrementShapeNumNum() {
        if(this.shapeNum === this.shapes.length-1) {
            this.shapeNum = 0;
        } else {
            this.shapeNum += 1;
        }
    }

    mutate() {
        this.incrementShapeNumNum();
    }
    
    left() {
        this.x -= DIM;
    }

    right() {
        this.x += DIM;
    }

    down() {
        this.y += DIM;
    }
}
