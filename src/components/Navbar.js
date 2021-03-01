import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <nav>
            <div class="nav-wrapper" style={{textAlign: "center"}}>
              <a className="title">Sudoku Solver</a>
              
            </div>
          </nav>
        );
    }
}

export default Navbar;