import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Cell } from '../cell';
import { PIECE_IDS,PIECE_L,PIECE_O,PIECE_I,PIECE_T} from '../piece-permutations';
import { Piece } from '../piece';


const ROWS = 15;
const COLS = 10;
const DIM = 30;

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

  public currentBoard:Cell[] = [];

  public currentPiece:Piece;
  
  private ctx: CanvasRenderingContext2D;

  public gameLoop;

  constructor() {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.addCells()
    this.addNextPiece();
    this.resetBoardFilledValues();
    this.drawBoard();
  }

  /**Adds all the cells to the game-board */
  addCells() {
    for(let x = 0 ; x < ROWS ; x ++) {
      for(let y = 0 ; y < COLS ; y ++) {
        let fill:number = 0;
        let px:number = y * DIM;
        let py:number = x * DIM;
        let cell = new Cell(fill,px,py);
        this.currentBoard.push(cell);
      }
    }
  }

  addNextPiece(){
    let randIndex = (Math.random() * PIECE_IDS.length) | 0 ;
    let nextPiece = PIECE_IDS[randIndex];
    if(nextPiece === "T") {
      this.currentPiece = new Piece(PIECE_T);
    }
    if(nextPiece === "L") {
      this.currentPiece = new Piece(PIECE_L);
    }
    if(nextPiece === "O") {
      this.currentPiece = new Piece(PIECE_O);
    }
    if(nextPiece === "I") {
      this.currentPiece = new Piece(PIECE_I);
    }
  }

  down() {
    this.currentPiece.moveDown();
    console.log(this.currentPiece);
  }

  left() {
    this.currentPiece.moveLeft();
    this.clearBoard();
    this.resetBoardFilledValues();
    this.drawBoard();

  }

  right() {
    this.currentPiece.moveRight();
    this.clearBoard();
    this.resetBoardFilledValues();
    this.drawBoard();
  }

  update() {
    this.clearBoard();
    this.down();
    this.resetBoardFilledValues();
    this.drawBoard();
  }

  clearBoard() {
    this.ctx.clearRect(0,0,this.w,this.h);
    for(let cell of this.currentBoard) {
      cell.isFilled = 0;
    }
  }

  resetBoardFilledValues(){
    for(let i = 0 ; i < this.currentBoard.length ; i ++){
      for(let j = 0  ; j < this.currentPiece.xyCoords.length ; j ++) {
        let bx = this.currentBoard[i].posX;
        let by = this.currentBoard[i].posY;
        let cpx = this.currentPiece.xyCoords[j][0];
        let cpy = this.currentPiece.xyCoords[j][1];
        if(bx === cpx && by === cpy) {
          this.currentBoard[i].isFilled = 1;
        }
      }
    }
  }

  drawBoard(){
    for(let cell of this.currentBoard) {
      this.ctx.strokeStyle = 'red';
      this.ctx.strokeRect(cell.posX,cell.posY,DIM,DIM);
      if(cell.isFilled === 1){
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(cell.posX,cell.posY,DIM,DIM);
      }
    }
  }

  start() {
    this.isStarted = true;
    this.gameLoop = setInterval( () => this.update(), 1000);
  }

  pause() {
    this.isStarted = false;
    clearInterval(this.gameLoop);
  }
} 
