import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Board } from '../board';

const SCALE = 1;
const ROWS = 17 * SCALE;
const COLS = 11 * SCALE;
const DIM = 30 /SCALE;
const START_SPEED = 2000;

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
  public board:Board;
  private ctx: CanvasRenderingContext2D;
  public gameLoop;
  public score = 0;
  public gameOver = false;

  constructor() {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.board = new Board(ROWS,COLS);
    this.drawBoard();
  }

  mutate() {
    this.board.mutatePiece();
    this.board.reset();
    this.ctx.clearRect(0,0,this.w,this.h);
    this.board.addPieceToBoard()
    this.drawBoard();
  }

  down() {
    this.board.reset();
    this.ctx.clearRect(0,0,this.w,this.h);
    this.board.movePieceDown();
    this.board.addPieceToBoard();
    this.drawBoard();
  }

  left() {
    this.board.movePieceLeft();
    this.board.reset();
    this.ctx.clearRect(0,0,this.w,this.h);
    this.board.addPieceToBoard()
    this.drawBoard();
  }

  right() {
    this.board.movePieceRight();
    this.board.reset();
    this.ctx.clearRect(0,0,this.w,this.h);
    this.board.addPieceToBoard()
    this.drawBoard();
  }
 
  /**MAIN GAME LOOP */
  update() {
    if(this.board.needsToSpawn()) {
      this.board.lockAndSpawn();
      if(this.board.getFullKeys().length > 0){
        let keys = this.board.getFullKeys();
        this.board.removeLines(keys);
        this.setScore(this.board.getScore());
      }
    }
    this.down();
    this.gameOver = this.board.gameOver;
    if(this.gameOver){
      this.pause();
      this.isStarted = false;
    }
  }
  restart() {
    this.ctx.clearRect(0,0,this.w,this.h);
    this.board = new Board(ROWS,COLS);
    this.score = 0;
    this.gameOver = false;
    this.drawBoard();
  }
  
  setScore(num){
    this.score = num;
  }

  drawBoard(){
    let fillXY = this.board.getFilledCells();
    this.ctx.strokeStyle = 'black';
    for(let xy of fillXY) {
      let x = xy[0];
      let y = xy[1];
      this.ctx.strokeRect(x,y,DIM,DIM);
      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(x,y,DIM,DIM);
    }
  }

  start() {
    this.isStarted = true;
    this.gameLoop = setInterval(() => this.update(), START_SPEED/4);
  }

  pause() {
    this.isStarted = false;
    clearInterval(this.gameLoop);
  }
} 
