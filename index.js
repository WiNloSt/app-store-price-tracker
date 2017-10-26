const puppeteer = require('puppeteer')
let browser

const main = async () => {
  browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://google.com')
  await page.screenshot({ path: 'google.png' })
  await browser.close()
  console.log('finished!!!')
}

main().catch(error => {
  console.error(error)
  browser.close()
})
