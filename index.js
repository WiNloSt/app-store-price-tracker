const puppeteer = require('puppeteer')
const { pushMessage } = require('./line')
let browser

const TRACKED_APP_URL = 'https://itunes.apple.com/us/app/be-focused-pro-focus-timer-goal-tracker/id961632517'
const LINE_GROUP_ID = process.env.LINE_GROUP_ID

const main = async () => {
  browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(TRACKED_APP_URL)
  const price = await page.$eval(`div.price`, div => div.innerHTML)
  console.log(price)
  await browser.close()
  pushMessage(LINE_GROUP_ID, `Be focused price dropped!!! ${price}`)
  console.log('finished!!!')
}

main().catch(error => {
  console.error(error)
  browser.close()
})
