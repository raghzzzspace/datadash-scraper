const { chromium } = require('playwright');

const baseUrl = 'https://datadash-study.vercel.app/seed/';
const seeds = Array.from({ length: 10 }, (_, i) => 53 + i);

(async () => {
  let total = 0;
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const seed of seeds) {
    const url = `${baseUrl}${seed}`;
    await page.goto(url);
    
    const numbers = await page.$$eval('table td', cells =>
      cells.map(cell => parseFloat(cell.textContent)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((acc, val) => acc + val, 0);
    console.log(`Seed ${seed} sum: ${sum}`);
    total += sum;
  }

  console.log(`TOTAL SUM: ${total}`);
  await browser.close();
})();
