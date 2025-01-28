
import { log } from "console";
import { platform } from "os";
import * as rl from "readline-sync";

const bord : [string, string, string][] = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
]



const players : string[] = ["X","O"];
let counter : number = 0;

while (true) {
  
  console.log(`Player ${players[counter]} is playing :`)
  console.log(" ")
  for (let i = 0; i < bord.length; i++) {
    if(i === 0){
      console.log(`    ${"0"}   ${"1"}   ${"2"}`); 
          }
          console.log(`  ${"+"}${"-".repeat(bord.length + 8)}${"+"}`);    
          console.log(`${i} | ${bord[i][0]} | ${bord[i][1]} | ${bord[i][2]} |`)
          if(i === 2) {
            console.log(`  ${"+"}${"-".repeat(bord.length + 8)}${"+"}`); 
          }
          
        }
        console.log(" ")

    const coordinate : string[] = rl.question("Enter coordinates (x,y): ").split(",")
    console.log(" ");
    const x : number = parseInt(coordinate[0]);
    const y : number = parseInt(coordinate[1]);
    

    if (x === 4) break;

    if(x < 3 && x >= 0 && y >= 0 && y < 3) {

      if(bord[x][y] !== " ") {

        console.log("This field is already filled !");
      }
      else {
        bord[x][y] = players[counter];
        
        let win : boolean = false;
        
        for (let i = 0; i < bord.length; i++) {
          if(bord[i][0] === players[counter] && bord[i][1] === players[counter] && bord[i][2] === players[counter] ||
          bord[0][i] === players[counter] && bord[1][i] === players[counter] && bord[2][i] === players[counter]) {
            win = true;

          }
        }

        if(bord[0][0] === players[counter] && bord[1][1] === players[counter] && bord[2][2] === players[counter] || 
          bord[0][2] === players[counter] && bord[1][1] === players[counter] && bord[2][0] === players[counter]
        ) {
          win = true;
        }
        
        if(win) {
          console.log(`${players[counter]} wins !`)
          break;
        }
        
        counter++;
        if(counter > 1) counter = 0;
      }
    }
    else {
      console.log("Wrong Coordinates !");
    } 
    
}


// let board : string[][] = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

// let currentPlayer : string = 'X';
// let moveCount : number = 0;

// while (true) {
//     console.log('  0 1 2');
//     for (let i = 0; i < 3; i++) {
//         let row = board[i].join('|');
//         console.log(`${i} ${row}`);
//         if (i < 2) console.log('  -----');
//     }

//     let move : string = rl.question(`Player ${currentPlayer}, enter your move (row,col): `);
//     let split : string[] = move.split(',');
//     let row : number = parseInt(split[0]);
//     let col : number = parseInt(split[1]);

//     console.log(row,col);

//     if (row >= 0 && row < 3 && col >= 0 && col < 3) {
//         if (board[row][col] === ' ') {
//             board[row][col] = currentPlayer;
//             moveCount++;

//             let win = false;
//             for (let i = 0; i < 3; i++) {
//                 if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer ||
//                     board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
//                     win = true;
//                 }
//             }
//             if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer ||
//                 board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
//                 win = true;
//             }

//             if (win) {
//                 console.log(`Player ${currentPlayer} wins!`);
//                 break;
//             } else if (moveCount == 9) {
//                 console.log("It's a draw!");
//                 break;
//             }

//             currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//         } else {
//             console.log('That spot is already taken, please choose another.');
//         }
//     } else {
//         console.log('Invalid move, please try again.');
//     }
// }