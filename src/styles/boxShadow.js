import colours from 'styles/colours';

const buildShadow = (size) =>
  `0 ${size}px ${size}px -${size + 1}px ${colours.shadow}`;

const boxShadow = {
  high: `${buildShadow(2)}, ${buildShadow(4)}, ${buildShadow(8)}, ${buildShadow(
    16
  )}`,
  low: `${buildShadow(2)}, ${buildShadow(4)}`,
  medium: `${buildShadow(2)}, ${buildShadow(4)}, ${buildShadow(8)}`,
};

export default boxShadow;
