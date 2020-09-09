import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Piece } from '../piece';
import { Cell } from '../cell';
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

  public cellMap:Map<number[], Cell>;

  public currentPiece:Piece;

  private ctx: CanvasRenderingContext2D;

  public gameLoop;

  constructor() {}

  ngOnInit(){
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.setCellMapForBoard();
    this.currentPiece = new Piece(START_X, START_Y, "T", PIECE_T, 0);
    this.addPieceToBoard(this.currentPiece);
  }

  setCellMapForBoard(){
    this.cellMap = new Map<number[],Cell>();
    for(let r = 0 ; r < ROWS ; r ++) {
      for (let c = 0 ; c < COLS ; c ++) {
        let x = c * DIM;
        let y = r * DIM;
        let xy = [];
        xy.push(x);
        xy.push(y);
        this.cellMap.set(xy, new Cell(false,0));
      }
    }
  }

  addPieceToBoard(p:Piece) {
    let pCells = [];
    for(let xy of p.getXYPositionsOfPiece(p.x, p.y, DIM)) {
      for(let k of this.cellMap.keys()) {
        if(JSON.stringify(xy) === JSON.stringify(k)) {
          this.cellMap.get(k).filled = 1;
          pCells.push(this.cellMap.get(k));
        }
      }
    }
    console.log(pCells);
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
