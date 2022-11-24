function withOpacity(variable) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variable}) / ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${variable}) / var(${opacityVariable}, 1))`; // let it rgbA for now
    }
    return `rgb(var(${variable}))`;
  };
}

module.exports = withOpacity;
