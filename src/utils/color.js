export const mix = (color1, color2, weight = 0.5) => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  const r = Math.round(rgb1[0] * weight + rgb2[0] * (1 - weight));
  const g = Math.round(rgb1[1] * weight + rgb2[1] * (1 - weight));
  const b = Math.round(rgb1[2] * weight + rgb2[2] * (1 - weight));
  return rgbToHex(r, g, b);
};

/**
 * 将颜色从 hex 格式转换为 RGB
 *
 */
export const hexToRgb = (hex) => {
  if (hex === "transparent") {
    return [0, 0, 0];
  }
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

/**
 * 将 RGB 转换为 hex 格式
 */
export const rgbToHex = (r, g, b) => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
};

/**
 * 为 hex 格式颜色添加透明度
 */
export const rgba = (hex, alpha) => {
  // 移除十六进制颜色的井号（#）并确保长度为 6
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // 解析 RGB 值
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // 返回 RGBA 字符串
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
