import { Sprite, Assets, Container, Text, TextStyle } from 'pixi.js';
import { fitTextToWidth } from './utils.js';
import { reelBands } from './reels.js';

const BASE_WIDTH = 1280;
const SYMBOL_WIDTH = 120;
const SYMBOL_HEIGHT = 120;
const SPACING_X = 10;
const SPACING_Y = 10;

const gameContainer = new Container();
let reelPositions = [0, 0, 0, 0, 0];
const spriteGrid = [];

let winText;
let spinButton;

export function setupGame(app) {
  app.stage.addChild(gameContainer);

  // Create symbols grid
  for (let col = 0; col < 5; col++) {
    spriteGrid[col] = [];
    for (let row = 0; row < 3; row++) {
      const symbolName = reelBands[col][row];
      const texture = Assets.cache.get(symbolName); //grabs the image texture for the symbol from the preloaded assets
      const sprite = new Sprite(texture); //creates a new sprite using the texture
      sprite.symbolId = symbolName;
      spriteGrid[col][row] = sprite; //saves the sprite into the grid
      gameContainer.addChild(sprite); //makes the sprite appear on screen
    }
  }

  // Spin button setup
  const spinTexture = Assets.cache.get('spinButton');
  spinButton = new Sprite(spinTexture);
  spinButton.interactive = true;
  spinButton.buttonMode = true;
  spinButton.on('pointerdown', () => spinReels());
  gameContainer.addChild(spinButton);

  // Win text setup
  const winTextStyle = new TextStyle({
    fill: '#ffff00',
    fontSize: 28,
    fontWeight: 'bold',
    stroke: '#000000',
  });
  winText = new Text({ text: 'Ready to play?', style: winTextStyle });
  winText.anchor.set(0.5);
  gameContainer.addChild(winText);

  layout();
  window.addEventListener('resize', layout);
  updateGrid();
}


function updateGrid() {
  for (let col = 0; col < 5; col++) {
    const pos = reelPositions[col];
    for (let row = 0; row < 3; row++) {
      const index = (pos + row) % reelBands[col].length;
      const symbolName = reelBands[col][index];
      const texture = Assets.cache.get(symbolName);
      const sprite = spriteGrid[col][row];
      sprite.texture = texture;
      sprite.symbolId = symbolName;
    }
  }
}

function spinReels() {
  for (let i = 0; i < reelPositions.length; i++) {
    reelPositions[i] = Math.floor(Math.random() * reelBands[i].length);
  }
  
  updateGrid();
  
  const idGrid = getIdGrid(spriteGrid);
  const { total, details } = checkWins(idGrid);
  
  if (total > 0) {
    const lines = [`Total wins: ${total}`, ...details];
    winText.text = lines.join('\n');
  } else {
    winText.text = 'No wins, try again!';
  }
  
  fitTextToWidth(winText, BASE_WIDTH * 0.8);
}

function layout() {
  const topMargin = 10;
  const winTextLineHeight = 35;
  const maxWinLines = 4;
  const winTextPadding = 10;

  const reelsHeight = SYMBOL_HEIGHT * 3 + SPACING_Y * 2;
  const spinButtonHeight = spinButton.height;
  const winTextHeight = winTextLineHeight * maxWinLines + winTextPadding;

  const contentHeight = topMargin + reelsHeight + spinButtonHeight + winTextHeight;
  const contentWidth = SYMBOL_WIDTH * 5 + SPACING_X * 4;

  const scaleX = window.innerWidth / contentWidth;
  const scaleY = window.innerHeight / contentHeight;
  const scale = Math.min(scaleX, scaleY);

  gameContainer.scale.set(scale);
  gameContainer.x = (window.innerWidth - contentWidth * scale) / 2;
  gameContainer.y = (window.innerHeight - contentHeight * scale) / 2;

  const startX = 0;
  const startY = topMargin;

  for (let col = 0; col < 5; col++) {
    for (let row = 0; row < 3; row++) {
      const sprite = spriteGrid[col][row];
      sprite.x = startX + col * (SYMBOL_WIDTH + SPACING_X);
      sprite.y = startY + row * (SYMBOL_HEIGHT + SPACING_Y);
      sprite.width = SYMBOL_WIDTH;
      sprite.height = SYMBOL_HEIGHT;
    }
  }

  spinButton.x = contentWidth / 2 - spinButton.width / 2;
  spinButton.y = startY + reelsHeight + 20;

  winText.x = contentWidth / 2;
  winText.y = spinButton.y + spinButton.height + 50;

  fitTextToWidth(winText, contentWidth * 0.8);
}
