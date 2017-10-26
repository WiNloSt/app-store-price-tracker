const { pushMessage } = require('./line')
const getPrice = require('./getPrice')
const { storePrice, getLastestPrice, disconnectFromDatabase } = require('./db')
const { extractPrice } = require('./utils')

const LINE_GROUP_ID = process.env.LINE_GROUP_ID

const main = async () => {
  const price = await getPrice()
  const priceObject = extractPrice(price)
  const latestPrice = await getLastestPrice()
  if (priceObject.price < latestPrice.price) {
    await storePrice(price)
    pushMessage(LINE_GROUP_ID, `Be Focused Pro price dropped!!! ${price}`)
  }
  disconnectFromDatabase()
  console.log(price, `${latestPrice.currency}${latestPrice.price}`)
}

main()
