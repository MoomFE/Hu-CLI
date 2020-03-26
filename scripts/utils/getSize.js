const B = 1024;
const KB = B * B;


module.exports = (size) => {
  if (size < B) {
    return `${size}B`;
  }
  if (size < KB) {
    return `${(size / B).toFixed(2)}KB`;
  }

  return `${(size / KB).toFixed(2)}MB`;
};
