const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://www.amazon.es');
  await page.screenshot({ path: 'amazon1.jpg' });

  await page.type('#twotabsearchtextbox', 'libros javascript');
  await page.screenshot({ path: 'amazon2.jpg' });

  await page.click('.nav-search-submit input');
  await page.waitForSelector('[data-component-type=s-search-result]');
  //   await page.waitForTimeout(2000);
  await page.screenshot({ path: 'amazon3.jpg' });

  const amazonLinks = await page.evaluate(() => {
    const element = document.querySelectorAll(
      '[data-component-type=s-search-result] h2 a'
    );
    const links = [];
    for (element of elements) {
      links.push(element.href);
    }
    return links;
  });
  const books = [];
  for (let link of links) {
    await page.goto(link);
    await page.waitForSelector('#productTitle');

    const book = await page.evaluate(() => {
      const temp = {};
      temp.title = document.querySelector('#productTitle').innerText;
      temp.author = document.querySelector('.author a').innerText;
      return temp;
    });
    books.push(book);
  }

  console.log(books);
  await browser.close();
})();
