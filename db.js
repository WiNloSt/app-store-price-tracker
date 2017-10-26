const mongoose = require('mongoose')
const { extractPrice } = require('./utils')

const MONGODB_URI = process.env.MONGODB_URI

mongoose.Promise = global.Promise
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
})

const priceSchema = mongoose.Schema({
  name: String,
  date: Date,
  price: Number,
  currency: String
})

const Price = mongoose.model('Price', priceSchema)
Price.last = function() {
  return this.findOne().sort({
    _id: -1
  })
}

const storePrice = async price => {
  const priceObject = extractPrice(price)
  return await new Price({
    name: 'Be Focused Pro',
    date: Date.now(),
    ...priceObject
  }).save()
}

const getLastestPrice = () => Price.last()

const disconnectFromDatabase = () => mongoose.disconnect()

module.exports = {
  storePrice,
  getLastestPrice,
  disconnectFromDatabase
}
