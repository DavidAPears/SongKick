const puppeteer = require('puppeteer');

let scrape = async () => {
const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();

await page.goto('http://www.wegottickets.com/searchresults/all');

const result = await page.evaluate(() => {
  let data = [];
  let elements = document.querySelectorAll('.content.block-group.chatterbox-margin');

  for (var element of elements){
      let title = element.childNodes[1].children[0].innerText;
      data.push({title});
  }

  return data;
});

browser.close();
return result;
};

scrape().then((value) => {
console.log(value);
});
