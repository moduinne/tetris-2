import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Board } from '../board';
import { Piece } from '../piece';
import { PIECE_T } from '../piece-permutations';

const SCALE = 1;
const ROWS = 17 * SCALE;
const COLS = 11 * SCALE;
const DIM = 30 /SCALE;
const START_SPEED = 1000;
const START_X = 4 * DIM;
const START_Y = 0 * DIM;

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

  public currentPiece:Piece;

  private ctx: CanvasRenderingContext2D;

  public gameLoop;

  constructor() {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.board = new Board(COLS,ROWS);
    this.currentPiece = new Piece(START_X,START_Y, "T", PIECE_T, 0);
    this.board.addPieceToBoard(this.currentPiece);
    this.drawBoard();
  }

  mutate() {
    
  }

  left() {
    console.log('left button pressed');
  }

  right() {
    console.log('right button pressed');
  }
 
  update() {

    
  }

  drawBoard(){
    

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
