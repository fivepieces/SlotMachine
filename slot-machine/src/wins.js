import { paylines, paytable } from './paylines.js';


//spriteGrid is like this: [col][row]
//idGrid converts it to [row][col] which makes it easier to work with (apparently, asked google for this)
//so having data in idGrid[row][col] lets me access them naturally during win calculations.
export function getIdGrid(spriteGrid) {
  const idGrid = [];

  for (let row = 0; row < 3; row++) {
    idGrid[row] = [];
    for (let col = 0; col < 5; col++) {
      idGrid[row][col] = spriteGrid[col][row].symbolId;
    }
  }

  return idGrid;
}

export function checkWins(idGrid) {
  let total = 0;
  const details = [];

  for (let i = 0; i < paylines.length; i++) {
    const line = paylines[i];
    const [firstX, firstY] = line[0]; //grabs the symbol ID at the first position in the payline
    const firstSymbol = idGrid[firstY][firstX]; //this is the symbol we're trying to match

    let matchCount = 1;
    for (let j = 1; j < line.length; j++) {
      const [x, y] = line[j];
      if (idGrid[y][x] === firstSymbol) {
        matchCount++;
      } else {
        break;
      }
    }

    if (matchCount >= 3 && paytable[firstSymbol]) {
      const payout = paytable[firstSymbol][matchCount - 3];
      total += payout;
      details.push(`- payline ${i + 1}, ${firstSymbol} x${matchCount}, ${payout}`);
    }
  }

  return { total, details };
}
