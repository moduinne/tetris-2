import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Cell } from '../cell';
import { PIECE_IDS,PIECE_L,PIECE_O,PIECE_I,PIECE_T} from '../piece-permutations';
import { Piece } from '../piece';
import { of } from 'rxjs';
import { Board } from '../board';

const SCALE = 1;
const ROWS = 17 * SCALE;
const COLS = 11 * SCALE;
const DIM = 30 /SCALE;
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

  public board:Board;
  

  private ctx: CanvasRenderingContext2D;

  public gameLoop;

  constructor() {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.board = new Board(COLS,ROWS);
    // this.addCells()
    // this.addNextPiece();
    // this.drawBoard();
  }

  /**Adds all the cells to the game-board */
  addCells() {
    
  }
  
  //adds a piece randomly from available pieces
  addNextPiece(){
   
  }

  isAbleToMutate() :Boolean {
    
    return true;
  }

  mutate(){
    console.log(this.board.w);
  }

  isOverLapDown() {
    
    return false;
  }

  isOverLapRight() {
    
    return false;
  }

  isOverLapLeft() {
    
    return false;
  }

  //returns true iff the current piece can move
  moveValid():boolean {
    return true;
  }

  //moves the piece one dim down
  down() {
    
  }

  //moves piece one dim left
  left() {
   
  }
 
  //moves piece one dim right
  right() {
    
  }

  getBoardInRows():Cell[][] {
    return null;
  }

  //Creates the board map to rows based on 0 to w/e
  createBoardMap() {
    
  }

  isFullRow(row:Cell[]) :Boolean {
    return true;
  }

  findAllFullRows():Number[] {
    return null;
  }

  removeFullRows() {

  }

  getCellsToDrop(rows:Number[]) {
    return null;
  }

  getNewLockedXYCoords(arr:Number[]) {
    return null;
  }

  //the call update per loop in the start() method setinterval call
  update() {
    
  }

  clearBoard() {
    
  }

  resetBoardFilledValues(){

  }

  drawBoard(){
    
  }

  start() {
    this.isStarted = true;
    this.gameLoop = setInterval( () => this.update(), START_SPEED/2);
  }

  pause() {
    this.isStarted = false;
    clearInterval(this.gameLoop);
  }
} 
