module.exports = {
  quote: (str) => `":"${str}`,
  unquote: (str) => str.replace(/[":]/g, ''),
}
