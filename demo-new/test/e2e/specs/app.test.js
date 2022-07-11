import puppeteer from "puppeteer";

jest.setTimeout(60000);

describe("Basic authentication e2e tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  beforeEach(async () => {
    await page.goto("http://localhost:3000");
    await page.reload();
  });

  it("navigate to the app and you are in the httpbin spec", async () => {
    const infoTitle = await page.$eval(".info .header h2.title", el => el.innerText);

    expect(infoTitle).toBe("httpbin\n 1.0-oas3 \nOAS3")
  });

  afterAll(() => browser.close());
});
