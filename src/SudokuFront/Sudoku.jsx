import React from "react";
import { solve } from "../SudokuBack/algorithms";
import "./Sudoku.css";



export default class Sudoku extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            board: [],
            upload: [],
            result: [],
        };
    }

    componentDidMount() {
        this.refresh();
        var M = window.M;
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, []);
        var elem = document.getElementById("modal1");
        var instance = M.Modal.getInstance(elem);
        instance.open();
    }

    refresh() {
        this.setState({board: fillBoard()});
        this.setupBoard(this.state.board);
    }

    setupBoard(board) {
        
        const elems = document.getElementsByClassName("node");
        for (let i = 0; i < board.length; i++) {
            if(board[i] !== 0) {
                elems[i].innerHTML = board[i];
            }
            else {
                elems[i].innerHTML = "";
            }
            
        }
    }


    //remove newlines etc from file to make a only number array of length 81
    filterUpload() {
        const grid = [];
        var upload = this.state.upload;
        // create hashmap of number strings from 0-9
        const numbers = new Set();
        for(let i = 0; i < 10; i++) {
            numbers.add(i.toString());
        }
        // if strign at i is number at to grid
        for (let i = 0; i < upload.length; i++) {
            if(numbers.has(upload[i])) {
                grid.push(parseInt(upload[i]));
            }
            
        }
        this.setState({board: grid});
    }


    async solve() {
        const grid = solve(this.state.board);
        this.setState({result: grid});
        await delay(1);
        this.setupBoard(this.state.result);
    }

    handleChangeFile = (file) => {
        let fileData = new FileReader();
        fileData.onloadend = this.handleFile;
        fileData.readAsText(file);
    }

    handleFile = (e) => {
        const content = e.target.result;
        this.setState({upload: content});
        this.filterUpload();
        this.setupBoard(this.state.board);
    }


    render() {
        const {board} = this.state;
        const grid = [];
        for(let i = 0; i < board.length; i++) {
            grid.push(<div key={i} className={"node " + "r"+Math.floor(i/9)+"c"+i%9 + " " + "row"+Math.floor(i/9) + " " + "col"+ i%9  }></div>);
        }

        return (
            <>
            <div className="back-btn" style={{position: "absolute", padding: 0, margin: 0}}>
                        <a href="https://projectaki.github.io/portfolio_akos_madarasz/#/Projects" style={{color: "black"}} >
                            <i class="fas fa-arrow-left fa-2x"></i>
                        </a>
                    </div>
                <div className="boardCont">
                    {grid}    
                </div>

                <div class="buttonCont">
                    <div>
                    <input style={{ fontSize: "1.5vmin", color: "white"}} type="file"
                    name="myFile"
                    accept=".txt"
                    onChange={e => 
                        this.handleChangeFile(e.target.files[0])}/>
                    </div>
                    <div style={{paddingTop: "2vmin"}}>
                        <button onClick={() => this.solve()}>Solve</button>
                        
                    </div>
                    
                
                    

                </div>
                
                <div id="modal1" class="modal">
                    <div class="modal-content">
                    <h4 style={{fontSize: "2vmin"}}>Instruction</h4>
                    <p style={{fontSize: "1.5vmin"}}>Upload a txt file of a 9x9 sudoku then press solve!
    
                    </p>
                    <p style={{fontSize: "1.5vmin"}}>Limitations: for now it is only solving 9x9 sudokus, and the board must be in a format
                        where the empty spaces are represented by 0s
    
                    </p>
                    <p style={{fontSize: "1.5vmin"}}>
                            For example:<br/>
                            003020600<br/>
                            900305001<br/>
                            001806400<br/>
                            008102900<br/>
                            700000008<br/>
                            006708200<br/>
                            002609500<br/>
                            800203009<br/>
                            005010300
                    </p>
                    
                    </div>
                    
                </div>
                
                
            </>
            
        )
    }
}

function fillBoard() {
    const board = [];
    for(let i = 0; i < 81; i++) {
        board.push(0);
    }
    return board;
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
