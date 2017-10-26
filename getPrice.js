const puppeteer = require('puppeteer')
let browser

const TRACKED_APP_URL = 'https://itunes.apple.com/us/app/be-focused-pro-focus-timer-goal-tracker/id961632517'

const getPrice = async () => {
  try {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage()
    await page.goto(TRACKED_APP_URL)
    const price = await page.$eval(`div.price`, div => div.innerHTML)
    await browser.close()

    return price
  } catch (error) {
    console.error(error)
    browser.close()

    return 'error while getting price'
  }
}

module.exports = getPrice
