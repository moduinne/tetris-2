import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

const ROWS = 15;
const COLS = 10;
const DIM = 30;
const START_COL = 3;
const START_X = START_COL*DIM;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;

  public w = COLS*DIM;
  public h = ROWS*DIM;

  public isStarted:boolean = false;

  public currentBoard = [];

  public pieceL = [[1,0,0],[1,1,1],[0,0,0]];
  public pieceO = [[1,1,0],[1,1,0],[0,0,0]];
  public pieceI = [[0,1,0],[0,1,0],[0,1,0]];

  public pieceCoords= [];
  
  private ctx: CanvasRenderingContext2D;

  public gameLoop;

  constructor() {}

  ngOnInit(): void {
    this.initialBoardStat()
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  initialBoardStat() {
    for(let y = 0 ; y < ROWS ; y ++){
      let row = [];
      for(let x = 0 ; x < COLS ; x ++) {
        row.push(0);
      }
      this.currentBoard.push(row);
    }
    console.table(this.currentBoard); //<--------------------TESTING TABLE
  }

  convertPieceToXYCoords(piece) {
    let xyCoords = [];
    for(let y = 0 ; y < piece.length ; y ++) {
      for(let x = 0 ; x < piece[y].length ; x ++) {
        if(piece[y][x] > 0) {
          let xyCoord = []
          let posX = (START_COL + x) * DIM;
          let posY = y * DIM;
          xyCoord.push(posX,posY);
          xyCoords.push(xyCoord);
        }
      }
    }
    return xyCoords;
    //console.log("calculated: " + xyCoords);
  }

  addLPiece() {
    this.pieceCoords = this.convertPieceToXYCoords(this.pieceL);
    this.ctx.fillStyle='blue';
    for(let cell = 0 ; cell < this.pieceCoords.length ; cell ++){
      let posX = this.pieceCoords[cell][0];
      let posY = this.pieceCoords[cell][1];
      this.ctx.fillRect(posX,posY,DIM,DIM);
    }
  }

  start() {
    this.isStarted = true;
    this.addLPiece();
    this.gameLoop = setInterval( () => this.update(), 1000);
  }

  update() {
    this.down();

  }

  /**Moves the current piece down*/
  down(){
    this.ctx.clearRect(0,0,COLS*DIM,ROWS*DIM);
    for(let i = 0 ; i < this.pieceCoords.length ; i ++){
      this.pieceCoords[i][1] += DIM;
    }
  }

  pause() {
    this.isStarted = false;
    clearInterval(this.gameLoop);
  }
} 
