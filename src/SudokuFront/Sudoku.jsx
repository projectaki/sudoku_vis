import React from "react";
import { solve } from "../SudokuBack/algorithms";
import "./Sudoku.css";

export default class Sudoku extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: [],
        
        };
    }

    componentDidMount() {
        this.refresh();
        
    }

    refresh() {
        const grid = createGrid();
        this.setState({grid});
        this.setUpNumbers(0);
    }

    async setUpNumbers(ms) {
        
        const elems = document.getElementsByClassName("node");
        for (let i = 0; i < this.state.grid.length; i++) {
            for (let j = 0; j < this.state.grid.length; j++) {
                let index = coordMap(i, j);
                if (this.state.grid[i][j] !== 0) {
                    elems[index].innerHTML = this.state.grid[i][j];
                }
                else {
                    elems[index].innerHTML = "";
                }
                if (ms !== 0) {
                    await delay(ms);
                }
            }
            
        }
    }

    hardest() {
        hardestBoard(this.state.grid);
        this.setUpNumbers(0);
    }

    solve() {
        const grid = solve(this.state.grid);
        this.setState({grid});
        this.setUpNumbers(20);
    }


    render() {
        const {grid} = this.state;
        
        return (
            <>
            <div className="title">
                SUDOKU SOLVER
            </div>
                <div className="boardCont">
                    {grid.map((row, rowid) => {
                        return row.map( (node, nodeid) => { 
                                return <div key={nodeid} className={"node " + "r"+rowid+"c"+nodeid + " " + "col"+nodeid + " " + "row"+rowid}></div>; 
                        });
                    })}    
                </div>

                <div class="buttonCont">
                    <button onClick={() => this.refresh()}>Refresh</button>
                    <button onClick={() => this.solve()}>Solve</button>
                    <button onClick={() => this.hardest()}>hardest</button>
                </div>
                
                
                
            </>
            
        )
    }






}

function createGrid() {
    const grid = [];
    for (let row = 0; row < 9; row++) {
        const currentRow = [];
        for (let col = 0; col < 9; col++) {
            currentRow.push(0);
        }
        grid.push(currentRow);
    }
    return grid;
}

function coordMap(i , j) {
    return i * 9 + j;
}

function delay(n) {  
    n = n || 2000;
    return new Promise(done => {
      setTimeout(() => {
        done();
      }, n);
    });
  }

function hardestBoard(SUDOKU) {
    SUDOKU[0][0] = 8;
    SUDOKU[1][2] = 3;
    SUDOKU[1][3] = 6;
    SUDOKU[2][1] = 7;
    SUDOKU[2][4] = 9;
    SUDOKU[2][6] = 2;
    SUDOKU[3][1] = 5;
    SUDOKU[3][5] = 7;
    SUDOKU[4][4] = 4;
    SUDOKU[4][5] = 5;
    SUDOKU[4][6] = 7;
    SUDOKU[5][3] = 1;
    SUDOKU[5][7] = 3;
    SUDOKU[6][2] = 1;
    SUDOKU[6][7] = 6;
    SUDOKU[6][8] = 8;
    SUDOKU[7][2] = 8;
    SUDOKU[7][3] = 5;
    SUDOKU[7][7] = 1;
    SUDOKU[8][1] = 9;
    SUDOKU[8][6] = 4;
}