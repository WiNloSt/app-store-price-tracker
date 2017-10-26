const puppeteer = require('puppeteer')
let browser

const TRACKED_APP_URL = 'https://itunes.apple.com/us/app/be-focused-pro-focus-timer-goal-tracker/id961632517'

const main = async () => {
  browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(TRACKED_APP_URL)
  const price = await page.$eval(`div.price`, div => div.innerHTML)
  console.log(price)
  await browser.close()
  console.log('finished!!!')
}

main().catch(error => {
  console.error(error)
  browser.close()
})
