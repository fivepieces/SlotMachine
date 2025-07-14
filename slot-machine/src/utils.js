export function fitTextToWidth(text, maxWidth) {
  // Reset scale
  text.scale.set(1);

  // If too wide, scale down proportionally
  if (text.width > maxWidth) {
    const scale = maxWidth / text.width;
    text.scale.set(scale);
  }
}