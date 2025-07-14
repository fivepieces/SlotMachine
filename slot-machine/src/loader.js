import {Assets, Text, TextStyle } from 'pixi.js';

//Define asset list with short aliases
const symbolNames = ['hv1', 'hv2', 'hv3', 'hv4', 'lv1', 'lv2', 'lv3', 'lv4'];
const allAssets = [
    ...symbolNames.map(name => ({
        alias: name,
        src: `/assets/symbols/${name}_symbol.png`,

    })),
    {
        alias: 'spinButton',
        src: '/assets/spin_button.png',
    },
];

export async function preloadAssets(app, onComplete) {
  // Create TextStyle instance for loading text
  const loadingStyle = new TextStyle({
    fill: '#ffffff',
    fontSize: 24,
  });

  // Create PIXI Text for loading percentage
  const loadingText = new Text({ text: 'Loading: 0%', style: loadingStyle})

  // Center anchor point
  loadingText.anchor.set(0.5);

  // Initial position in the middle of the screen
  loadingText.x = app.screen.width / 2;
  loadingText.y = app.screen.height / 2;

  // Add loading text to the stage
  app.stage.addChild(loadingText);

  // Keep loading text centered on window resize
  const updateTextPosition = () => {
    loadingText.x = app.screen.width / 2;
    loadingText.y = app.screen.height / 2;
  };
  window.addEventListener('resize', updateTextPosition);

  // Load assets one by one and update loading progress
  let loadedCount = 0;
  for (const asset of allAssets) {
    await Assets.load(asset.src).then(texture => {
      Assets.cache.set(asset.alias, texture);
      loadedCount++;
      const percent = Math.round((loadedCount / allAssets.length) * 100);
      loadingText.text = `Loading: ${percent}%`;
    });

    await delay(150);
  }

  // Clean up after loading is complete
  window.removeEventListener('resize', updateTextPosition);
  app.stage.removeChild(loadingText);

  // Call the next phase (game setup)
  onComplete(app);
}


// Simple helper to wait N milliseconds - for testing
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}