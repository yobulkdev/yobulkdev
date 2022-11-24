function hexToRgb(hex) {
  const result3 = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex);
  const result6 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  const obj = result6
    ? {
        r: parseInt(result6[1], 16),
        g: parseInt(result6[2], 16),
        b: parseInt(result6[3], 16),
      }
    : result3
    ? {
        r: parseInt(result3[1] + result3[1], 16),
        g: parseInt(result3[2] + result3[2], 16),
        b: parseInt(result3[3] + result3[3], 16),
      }
    : null;

  // just numbers, no rgb() here but in with-opacity
  // rgb(255 255 255 / 1);
  return obj ? `${obj.r} ${obj.g} ${obj.b}` : null;
}

module.exports = hexToRgb;
