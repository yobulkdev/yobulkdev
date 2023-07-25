function autoCorrectBooleans(bools) {
  const trueFormats = ['True', 'true', 'TRUE', '1'];
  const falseFormats = ['False', 'false', 'FALSE', '0', null, undefined];

  const mostCommonTrueFormat = trueFormats.find((f) => bools.includes(f)) || trueFormats[0];
  const mostCommonFalseFormat = falseFormats.find((f) => bools.includes(f)) || falseFormats[0];

  return bools.map((b) => {
    if (trueFormats.includes(b)) {
      return mostCommonTrueFormat;
    } else if (falseFormats.includes(b)) {
      return mostCommonFalseFormat;
    } else {
      return b ? mostCommonTrueFormat : mostCommonFalseFormat;
    }
  });
}

export default autoCorrectBooleans;