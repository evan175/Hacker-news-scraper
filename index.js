const { chromium } = require('playwright');
const fs = require('fs')

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

  let top10Articles = []

  for(let i = 0; i < 10; i++){
    let ithElement = page.locator('.titleline > a').nth(i)
    let ithID = await ithElement.textContent()
    let ithURL = await ithElement.getAttribute('href')
    top10Articles.push([ithID, ithURL])
  }
  
  let csvContent = "Title,URL\n" + top10Articles.map(e => e.join(",")).join("\n");;
  fs.writeFileSync('hacker_news_articles.csv', csvContent);
  
}

(async () => {
  await saveHackerNewsArticles();
})();
