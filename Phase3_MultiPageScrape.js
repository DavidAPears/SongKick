const puppeteer = require('puppeteer');
function run (pagesToScrape) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!pagesToScrape) {
                pagesToScrape = 10;
            }
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto("http://www.wegottickets.com/searchresults/all");
            let currentPage = 1;
            let urls = [];
            while (currentPage <= pagesToScrape) {
                let newUrls = await page.evaluate(() => {
                  let data = [];
                  let elements = document.querySelectorAll('.content.block-group.chatterbox-margin');

                  for (var element of elements){ // Loops through each event
                    let Title = element.childNodes[1].children[0].innerText;
                    let CityAndVenue = element.childNodes[3].children[1].children[0].innerText;
                    let DateAndTime = element.childNodes[3].children[1].children[1].innerText;
                    let Price = element.childNodes[5].innerText;
                    let OtherInfo = element.childNodes[3].children[1].children[2].innerText;
                    data.push({Title, CityAndVenue, DateAndTime, Price, OtherInfo});
                    }

                    return data;
                });
                urls = urls.concat(newUrls);
                if (currentPage < pagesToScrape) {
                    await Promise.all([
                        await page.click('.pagination_link_text.nextlink'),
                        await page.waitForSelector('.content.block-group.chatterbox-margin')
                    ])
                }
                currentPage++;
            }
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}
run(5).then(console.log).catch(console.error);
