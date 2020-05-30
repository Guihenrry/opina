export function hexToRGB(hex: string, alpha = 1): string {
  let r;
  let g;
  let b;

  if (hex.length === 4) {
    r = parseInt(hex.slice(1, 2).repeat(2), 16);
    g = parseInt(hex.slice(2, 3).repeat(2), 16);
    b = parseInt(hex.slice(3, 4).repeat(2), 16);
  } else {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
