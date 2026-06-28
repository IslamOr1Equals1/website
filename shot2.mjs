import puppeteer from 'puppeteer'
const HTML_PATH = '/Users/is14m/Claude/Projects/Cyber Security Blog/is14m-v11.html'
const REACT_URL = 'http://localhost:3000'
const OUT = '/private/tmp/claude-501/-Users-is14m-Claude-Projects-Cyber-Security-Blog/79284c08-3499-41da-b8a6-ab6f5c1a5d40/scratchpad/'
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
async function shot(urlOrFile, file, scrollTo) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(urlOrFile.startsWith('http') ? urlOrFile : 'file://' + urlOrFile, { waitUntil: 'networkidle0', timeout: 15000 })
  await new Promise(r => setTimeout(r, 2000))
  if (scrollTo) {
    await page.evaluate((sel) => { const el = document.querySelector(sel); if (el) el.scrollIntoView() }, scrollTo)
    await new Promise(r => setTimeout(r, 500))
  }
  await page.screenshot({ path: file, fullPage: false })
  await page.close()
}
await Promise.all([
  shot(HTML_PATH, OUT + 'html-whyhire.png', '#why-hire'),
  shot(REACT_URL, OUT + 'react-whyhire.png', '#why-hire'),
  shot(HTML_PATH, OUT + 'html-services.png', '#services'),
  shot(REACT_URL, OUT + 'react-services.png', '#services'),
])
await browser.close()
console.log('done')
