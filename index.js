const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('http://www.amazon.es');
  await page.screenshot({ path: 'amazon1.jpg' });

  await page.type('#twotabsearchtextbox', 'libros javascript');
  await page.screenshot({ path: 'amazon2.jpg' });

  await page.click('.nav-search-submit input');
  await page.waitForSelector('[data-component-type=s-search-result]');
  await page.waitFor(3000);
  await page.screenshot({ path: 'amazon3.jpg' });

  await browser.close();
})();
