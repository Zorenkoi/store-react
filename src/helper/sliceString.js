export const sliceString = (string, numSymbol) => {
  if (string.length > numSymbol) {
    return string.slice(0, numSymbol) + '...'
  } else {
    return string
  }
}
