import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Cell } from '../cell';
import { PIECE_IDS,PIECE_L,PIECE_O,PIECE_I,PIECE_T} from '../piece-permutations';
import { Piece } from '../piece';

const ROWS = 15;
const COLS = 10;
const DIM = 30;
const BOARD_X_MAX = COLS * DIM;
const START_SPEED = 600;

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
  public lockedInPlaceCoords = [];

  private ctx: CanvasRenderingContext2D;

  public gameLoop;

  constructor() {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.addCells()
    this.addNextPiece();
    this.drawBoard();
  }

  /**Adds all the cells to the game-board */
  addCells() {
    for(let x = 0 ; x < ROWS ; x ++) {
      for(let y = 0 ; y < COLS ; y ++) {
        let fill:number = 0;
        let px:number = y * DIM;
        let py:number = x * DIM;
        let cell = new Cell(false,fill,px,py);
        this.currentBoard.push(cell);
      }
    }
  }
  
  //adds a piece randomly from available pieces
  addNextPiece(){
    let randIndex = (Math.random() * PIECE_IDS.length) | 0 ;
    let nextPiece = PIECE_IDS[randIndex];
    if(nextPiece === "T") {
      this.currentPiece = new Piece(PIECE_T, "T");
    }
    if(nextPiece === "L") {
      this.currentPiece = new Piece(PIECE_L, "L");
    }
    if(nextPiece === "O") {
      this.currentPiece = new Piece(PIECE_O, "O");
    }
    if(nextPiece === "I") {
      this.currentPiece = new Piece(PIECE_I, "I");
    }
  }

  mutate(){
    if(this.currentPiece.pieceID != "O"){
      console.log(this.currentPiece.currentPerm);
    }
    
  }

  isOverLapDown() {
    for(let i = 0 ;i  < this.currentPiece.xyCoords.length ; i++) {
      var x = this.currentPiece.xyCoords[i][0];
      var y = this.currentPiece.xyCoords[i][1];
      let coordPiece:number[] = [x,y+DIM];
      for(let j = 0 ; j < this.lockedInPlaceCoords.length ; j++) {
        let coordLockedCell:number[] = this.lockedInPlaceCoords[j];
        if(JSON.stringify(coordPiece) === JSON.stringify(coordLockedCell)) {
          return true;
        }
      }
    }
    return false;
  }

  isOverLapRight() {
    for(let i = 0 ;i  < this.currentPiece.xyCoords.length ; i++) {
      var x = this.currentPiece.xyCoords[i][0];
      var y = this.currentPiece.xyCoords[i][1];
      let coordPiece:number[] = [(x + DIM),y];
      for(let j = 0 ; j < this.lockedInPlaceCoords.length ; j++) {
        let coordLockedCell:number[] = this.lockedInPlaceCoords[j];
        if(JSON.stringify(coordPiece) === JSON.stringify(coordLockedCell)) {
          return true;
        }
      }
    }
    return false;
  }

  isOverLapLeft() {
    for(let i = 0 ;i  < this.currentPiece.xyCoords.length ; i++) {
      var x = this.currentPiece.xyCoords[i][0];
      var y = this.currentPiece.xyCoords[i][1];
      let coordPiece:number[] = [(x - DIM),y];
      for(let j = 0 ; j < this.lockedInPlaceCoords.length ; j++) {
        let coordLockedCell:number[] = this.lockedInPlaceCoords[j];
        if(JSON.stringify(coordPiece) === JSON.stringify(coordLockedCell)) {
          return true;
        }
      }
    }
    return false;
  }

  //returns true iff the current piece can move
  moveValid():boolean {
    if(this.currentPiece.getLowestY() < this.h-DIM 
          && !this.isOverLapDown()){
      return true;
    }
    return false;
  }

  //moves the piece one dim down
  down() {
    this.currentPiece.moveDown();
  }

  //moves piece one dim left
  left() {
    if(this.currentPiece.getLowestX() - DIM >= 0 &&!this.isOverLapLeft()){
      this.currentPiece.moveLeft();
      this.clearBoard();
      this.resetBoardFilledValues();
      this.drawBoard();
    }
  }
 
  //moves piece one dim right
  right() {
    if(this.currentPiece.getHighestX() + DIM < BOARD_X_MAX && !this.isOverLapRight())  {
      this.currentPiece.moveRight();
      this.clearBoard();
      this.resetBoardFilledValues();
      this.drawBoard();
      }
  }

  //the call update per loop in the start() method setinterval call
  update() {
    this.clearBoard();
    if(this.moveValid()){
      this.down();
    } else {
      for(let coor of this.currentPiece.xyCoords){
        this.lockedInPlaceCoords.push(coor);
      }
      this.addNextPiece();
      this.checkForFilledRow(); //TODO
    }
    this.resetBoardFilledValues();
    this.drawBoard();
  }

  checkForFilledRow() {
    //TODO
  }

  clearBoard() {
    this.ctx.clearRect(0,0,this.w,this.h);
     for(let cell of this.currentBoard) {
       cell.isFilled = 0;
     }
  }

  resetBoardFilledValues(){
    for(let cell of this.currentBoard){
      for(let coor of this.lockedInPlaceCoords){
        if(cell.posX === coor[0] && cell.posY === coor[1]){
          cell.isFilled = 1;
          cell.isLocked = true;
        }
      }
    }
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
       this.ctx.strokeStyle = 'black';
       this.ctx.strokeRect(cell.posX,cell.posY,DIM,DIM);
      if(cell.isFilled === 1){
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(cell.posX,cell.posY,DIM,DIM);
      }
    }
  }

  start() {
    this.isStarted = true;
    this.gameLoop = setInterval( () => this.update(), START_SPEED);
  }

  pause() {
    this.isStarted = false;
    clearInterval(this.gameLoop);
  }
} 
