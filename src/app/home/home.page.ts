import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Board } from '../board';

const SCALE = 1;
const ROWS = 17 * SCALE;
const COLS = 11 * SCALE;
const DIM = 30 /SCALE;
const START_SPEED = 1000;

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
 
  /**
   * the main game loop
   */
  update() {
    this.down();
    if(this.board.needsToSpawn()) {
      this.board.lockAndSpawn();
    }
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
