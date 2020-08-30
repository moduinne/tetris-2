import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

const ROWS = 15;
const COLS = 10;
const DIM = 30;
const START_X = 4*DIM;

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

  public pieceL = [[1,0,0],[1,1,1],[0,0,0]];

  public pieceCoords= [[3*DIM,0],[3*DIM,1*DIM],[4*DIM,1*DIM],[5*DIM,1*DIM]];

  private ctx: CanvasRenderingContext2D;

  constructor() {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  start() {
    this.addCells();
    this.addLPiece();
  }

  addLPiece() {
    this.ctx.fillStyle='blue';
    for(let cell = 0 ; cell < this.pieceCoords.length ; cell ++){
      let posX = this.pieceCoords[cell][0];
      let posY = this.pieceCoords[cell][1];
      this.ctx.fillRect(posX,posY,DIM,DIM);
    }
  }

  addCells() {
    this.ctx.strokeStyle = 'blue';
    for(let x = 0 ; x < COLS ; x ++ ) {
      for(let y = 0 ; y < ROWS ; y ++) {
        let posX = x*DIM;
        let posY = y*DIM;
        this.ctx.strokeRect(posX,posY,DIM,DIM);
      }
    }
  }

  down(){
    this.redraw();
    this.addCells();
    for(let i = 0 ; i < this.pieceCoords.length ; i ++){
      this.pieceCoords[i][1] += DIM;
    }
    this.addLPiece();

  }

  redraw() {
    this.ctx.clearRect(0,0,COLS*DIM,ROWS*DIM);
  }

  left(){
    this.redraw();
    this.addCells();
    for(let i = 0 ; i < this.pieceCoords.length ; i ++){

    }
  }
  right(){
    this.redraw();
    this.addCells();
    for(let i = 0 ; i < this.pieceCoords.length ; i ++){
      
    }
  }
  mutate(){
    this.redraw();
    this.addCells();
    for(let i = 0 ; i < this.pieceCoords.length ; i ++){
      
    }
  }
} 
