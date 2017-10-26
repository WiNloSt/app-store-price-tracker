const extractPrice = ([currency, ...digits]) => ({
  price: digits.join(''),
  currency,
})

module.exports = {
  extractPrice
}