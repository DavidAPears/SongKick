const pupeteer = require('puppeteer');

let scrape = async () => {
  const browser = await pupeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('http://www.wegottickets.com/searchresults/all');

  const result = await page.evaluate(() => {
      let data = [];
      let elements = document.querySelectorAll('.content.block-group.chatterbox-margin');

      for (var element of elements){ // Loops through each event
        let Title = element.childNodes[1].children[0].innerText;// Returns Title
        let CityAndVenue = element.childNodes[3].children[1].children[0].innerText; // Returns City & Venue (as one string)
        let DateAndTime = element.childNodes[3].children[1].children[1].innerText; // Returns Date & Time

        data.push({Title, CityAndVenue, DateAndTime}); 
        }

        return data;

      });

      browser.close();
      return result;
  };

  scrape().then((value) => {
      console.log(value);
  });
