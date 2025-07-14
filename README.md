# 🎰 Slot Machine Game (PIXI.js)
A responsive, browser-based slot machine game built using PIXI.js and Vite. This project simulates spinning reels with symbol-based paylines and calculates winnings using a dynamic paytable system.

---

## 📦 Features
- 🎨 Responsive layout that scales with window size
- 🧩 5x3 reels using sprites for symbols
- 💸 7 configurable paylines (horizontal & diagonal)
- 🏆 Win calculation logic with detailed breakdown text
- 🎯 Spin button with interactive logic
- ⚙️ Modular, maintainable code structure

---

## Getting Started

### 1. Clone the repo

```
git clone https://github.com/fivepieces/SlotMachine.git
cd slot-machine
```
### 2. Install dependencies
```
npm install
```
### 3. Start the dev server
```
npm run dev
```
## 🗂️ Project Structure
```
🗂️ slot-machine
┣ 🗂️ public
┣  ┣ 🗂️ assets
┣     ┣ 🗂️ symbols
┣     ┣ spin_button.png
┣ 🗂️ src
   ┣ 📜main.js           # PIXI app setup & game init
   ┣ 📜game.js           # Core layout, spin logic, UI
   ┣ 📜reels.js          # Reel band definitions (symbol order per reel)
   ┣ 📜paylines.js       # Payline definitions & paytable
   ┣ 📜wins.js           # Win-checking logic
   ┣ 📜utils.js          # Utility functions (e.g., fitTextToWidth)
