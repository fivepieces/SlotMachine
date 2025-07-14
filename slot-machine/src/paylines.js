// List of paylines (each line is a list of [column, row] positions)
export const paylines = [
  [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], // Line 1: Top row
  [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]], // Line 2: Middle row
  [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]], // Line 3: Bottom row
  [[0, 0], [1, 1], [2, 2], [3, 1], [4, 0]], // Line 4: Down V
  [[0, 2], [1, 1], [2, 0], [3, 1], [4, 2]], // Line 5: Up V
  [[0, 0], [1, 1], [2, 2], [3, 1], [4, 0]], // Line 6: Diagonal \
  [[0, 2], [1, 1], [2, 0], [3, 1], [4, 2]], // Line 7: Diagonal /
];

// Paytable: payouts for each symbol ID, index 0 = 3 of a kind, 1 = 4 of a kind, 2 = 5 of a kind
export const paytable = {
  hv1: [10, 20, 50],
  hv2: [5, 10, 20],
  hv3: [5, 10, 15],
  hv4: [5, 10, 15],
  lv1: [2, 5, 10],
  lv2: [1, 2, 5],
  lv3: [1, 2, 3],
  lv4: [1, 2, 3],
};